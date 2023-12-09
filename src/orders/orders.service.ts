import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderDto } from './dto/order.dto';
import { OrderRepository } from '../repositories/order.repository';
import { BooksService } from 'src/books/books.service';
import { UsersService } from 'src/users/users.service';
import { FindOrderDto } from './dto';
import { FindByIdDto, FindByIdsDto } from 'src/books/dto';
import { UserDto } from 'src/users/dto';
import { CartService } from 'src/cart/cart.service';

@Injectable()
export class OrdersService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly bookService: BooksService,
    private readonly userService: UsersService,
    private readonly cartService: CartService,
  ) {}

  async create(input: CreateOrderDto, user: UserDto): Promise<OrderDto> {
    const books = await this.bookService.findByIds(input.bookIds);

    const cart = await this.cartService.findOne({ id: input.cartId });

    if (books.length <= 0) {
      throw new BadRequestException('Invalid book details');
    }

    const userExists = await this.userService.findOne({ id: user.id });

    if (!userExists) {
      throw new BadRequestException('Invalid user details');
    }

    const order = await this.orderRepository.create({
      totalAmount: cart.total,
      user,
      books: books,
    });

    const newOrder = await this.orderRepository.save(order);

    this.cartService.resetCart({ cartId: input.cartId });

    return newOrder;
  }

  async findAll(filter: FindOrderDto): Promise<OrderDto[]> {
    return await this.orderRepository.find({
      where: { ...filter },
      relations: ['books'],
    });
  }

  async findOne(filter: FindByIdDto): Promise<OrderDto> {
    return await this.orderRepository.findOne({ where: { ...filter } });
  }
}
