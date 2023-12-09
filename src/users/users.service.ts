import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto, LoginDto } from './dto/create-user.dto';
import { UpdateResultDto, UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from '../repositories/user.repository';
import { LoginResponseDto, UserDto } from './dto';
import { CartRepository } from '../repositories/cart.repository';
import { FindUserByIdDto, FindUserDto } from './dto/find-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CartService } from 'src/cart/cart.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly cartService: CartService,
    private jwtService: JwtService,
  ) {}

  async create(input: CreateUserDto): Promise<UserDto> {
    const checkUserExists = await this.userRepository.findOne({
      where: { email: input.email },
    });

    if (checkUserExists) {
      throw new BadRequestException(
        'A user already exists with the same email',
      );
    }
    const userObject = await this.userRepository.create(input);

    const user = await this.userRepository.save(userObject);

    const userCart = await this.cartService.create({ quantity: 0 }, user);

    return { ...user, cart: userCart };
  }

  async login(input: LoginDto): Promise<LoginResponseDto> {
    const userExists = await this.userRepository.findOne({
      where: { email: input.email },
      relations: ['cart'],
    });

    if (!userExists) {
      throw new BadRequestException('Invalid credentials');
    }

    const isMatchPassword = await bcrypt.compare(
      input.password,
      userExists.password,
    );

    if (!isMatchPassword) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const accessToken = await this.jwtService.signAsync(
      {
        id: userExists.id,
        email: userExists.email,
      },
      {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRE,
      },
    );

    const cart = await this.cartService.findOne({ id: userExists.cart.id });

    return { user: userExists, accessToken: accessToken, cart };
  }

  async findAll(filter: FindUserDto): Promise<UserDto[]> {
    const users = await this.userRepository.find({
      where: { ...filter },
      relations: ['cart', 'orders'],
    });
    return users;
  }

  async findOne(filter: FindUserByIdDto): Promise<UserDto> {
    const user = await this.userRepository.findOne({
      where: { ...filter },
    });
    return user;
  }

  async update(input: UpdateUserDto): Promise<UpdateResultDto> {
    return (await this.userRepository.update(input.id, {
      ...input.data,
    })) as any as UpdateResultDto;
  }
}
