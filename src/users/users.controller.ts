import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, LoginDto } from './dto/create-user.dto';
import { UpdateResultDto, UpdateUserDto } from './dto/update-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { LoginResponseDto, UserDto } from './dto';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { JwtGuard } from 'src/helpers';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOkResponse({
    status: 200,
    type: UserDto,
    description: 'Creates a user',
  })
  @HttpCode(200)
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    return await this.usersService.create(createUserDto);
  }

  @ApiOkResponse({
    status: 200,
    type: UserDto,
    description: 'Login a user',
  })
  @HttpCode(200)
  @Post('/login')
  async login(@Body() input: LoginDto): Promise<LoginResponseDto> {
    return await this.usersService.login(input);
  }

  @ApiBearerAuth('JWT-TOKEN')
  @ApiOkResponse({
    status: 200,
    type: [UserDto],
    description: 'Gets multiple users',
  })
  @HttpCode(200)
  @UseGuards(JwtGuard)
  @Get()
  async findAll(@Query() filter: FindUserDto): Promise<UserDto[]> {
    return await this.usersService.findAll(filter);
  }

  @ApiBearerAuth('JWT-TOKEN')
  @ApiOkResponse({
    status: 200,
    type: UserDto,
    description: 'Get single user',
  })
  @HttpCode(200)
  @Get(':userId')
  @UseGuards(JwtGuard)
  async findOne(@Param('userId') userId: string): Promise<UserDto> {
    return await this.usersService.findOne({ id: userId });
  }

  @ApiBearerAuth('JWT-TOKEN')
  @ApiOkResponse({
    status: 200,
    type: UpdateResultDto,
    description: 'Get single user',
  })
  @HttpCode(200)
  @Patch(':userId')
  @UseGuards(JwtGuard)
  async update(
    @Param('userId') userId: string,
    @Body() body: UpdateUserDto,
  ): Promise<UpdateResultDto> {
    return await this.usersService.update({ ...body, id: userId });
  }
}
