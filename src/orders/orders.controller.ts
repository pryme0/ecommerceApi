import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  HttpCode,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { FindOrderDto } from './dto';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import {
  CreateOrderResponse,
  FindOrderAndCountResponse,
  OrderDto,
} from './dto/order.dto';
import { GetUser, JwtGuard } from 'src/helpers';
import { UserDto } from 'src/users/dto';
import { ResponseMessageDto } from 'src/cart/dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiBearerAuth('JWT-TOKEN')
  @ApiOkResponse({
    status: 200,
    type: CreateOrderResponse,
    description: 'Creates an order',
  })
  @HttpCode(200)
  @Post()
  @UseGuards(JwtGuard)
  create(
    @GetUser() user: UserDto,
    @Body() input: CreateOrderDto,
  ): Promise<CreateOrderResponse> {
    return this.ordersService.create(input, user);
  }

  @ApiBearerAuth('JWT-TOKEN')
  @ApiOkResponse({
    status: 200,
    type: FindOrderAndCountResponse,
    description: 'Finds orders',
  })
  @HttpCode(200)
  @Get()
  @UseGuards(JwtGuard)
  async findAll(
    @Query('filter') filter: FindOrderDto,
  ): Promise<FindOrderAndCountResponse> {
    return await this.ordersService.findAll(filter);
  }

  @ApiBearerAuth('JWT-TOKEN')
  @ApiOkResponse({
    status: 200,
    type: OrderDto,
    description: 'Get single order',
  })
  @HttpCode(200)
  @Get(':orderId')
  @UseGuards(JwtGuard)
  async findOne(@Param('orderId') orderId: string): Promise<OrderDto> {
    return this.ordersService.findOne({ id: orderId });
  }

  @ApiBearerAuth('JWT-TOKEN')
  @ApiOkResponse({
    status: 200,
    type: ResponseMessageDto,
    description: 'Delete/cancel order',
  })
  @HttpCode(200)
  @Delete(':orderId')
  @UseGuards(JwtGuard)
  async deleteOrder(
    @Param('orderId') orderId: string,
    @GetUser() user: UserDto,
  ): Promise<ResponseMessageDto> {
    return this.ordersService.deleteOrder(orderId, user);
  }
}
