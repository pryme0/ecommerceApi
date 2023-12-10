import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import {
  CreateOrderResponse,
  FindOrderAndCountResponse,
  OrderDto,
} from './dto/order.dto';
import { OrderRepository } from '../repositories/order.repository';
import { BooksService } from 'src/books/books.service';
import { UsersService } from 'src/users/users.service';
import { FindOrderDto } from './dto';
import { FindByIdDto, FindByIdsDto } from 'src/books/dto';
import { UserDto } from 'src/users/dto';
import { CartService } from 'src/cart/cart.service';
import { ResponseMessageDto } from 'src/cart/dto';

@Injectable()
export class OrdersService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly bookService: BooksService,
    private readonly userService: UsersService,
    private readonly cartService: CartService,
  ) {}

  async create(
    input: CreateOrderDto,
    user: UserDto,
  ): Promise<CreateOrderResponse> {
    const books = await this.bookService.findByIds(input.bookIds);

    const cart = await this.cartService.findOne({ id: input.cartId });

    if (user.points < cart.total) {
      throw new BadRequestException(
        'You dont have sufficient points to place this order ',
      );
    }
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

    const newUserPoints = userExists.points - cart.total;

    this.userService.update({
      id: userExists.id,
      data: { points: newUserPoints },
    });

    const updatedCart = await this.cartService.resetCart({
      cartId: input.cartId,
    });

    return { order: newOrder, cart: updatedCart };
  }

  async findAll(filter: FindOrderDto): Promise<FindOrderAndCountResponse> {
    const skip = (filter.page - 1) * filter.pageSize;
    const take = filter.pageSize;

    delete filter.page;
    delete filter.pageSize;

    if (filter.userId) {
      filter['user'] = { id: filter.userId };
      delete filter.userId;
    }

    const resp = await this.orderRepository.findAndCount({
      where: { ...filter },
      skip: skip || 0,
      take: take || 5,
      relations: ['books'],
    });

    return { orders: resp[0], count: resp[1] };
  }

  async findOne(filter: FindByIdDto): Promise<OrderDto> {
    return await this.orderRepository.findOne({ where: { ...filter } });
  }

  async deleteOrder(id: string, user: UserDto): Promise<ResponseMessageDto> {
    const order = await this.orderRepository.findOne({ where: { id } });
    if (!order) {
      throw new BadRequestException('Order does not exist');
    }

    await this.orderRepository.delete(id);

    const updatedUserPoints = user.points + order.totalAmount;

    await this.userService.update({
      id: user.id,
      data: { points: updatedUserPoints },
    });

    return { message: 'Order successfully removed' };
  }
}
