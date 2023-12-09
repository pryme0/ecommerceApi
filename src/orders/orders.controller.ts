import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { FindOrderDto } from './dto';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { OrderDto } from './dto/order.dto';
import { GetUser, JwtGuard } from 'src/helpers';
import { UserDto } from 'src/users/dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiBearerAuth('JWT-TOKEN')
  @ApiOkResponse({
    status: 200,
    type: OrderDto,
    description: 'Creates an order',
  })
  @HttpCode(200)
  @Post()
  @UseGuards(JwtGuard)
  create(
    @GetUser() user: UserDto,
    @Body() input: CreateOrderDto,
  ): Promise<OrderDto> {
    return this.ordersService.create(input, user);
  }

  @ApiBearerAuth('JWT-TOKEN')
  @ApiOkResponse({
    status: 200,
    type: [OrderDto],
    description: 'Finds orders',
  })
  @HttpCode(200)
  @Get()
  @UseGuards(JwtGuard)
  async findAll(@Query('filter') filter: FindOrderDto): Promise<OrderDto[]> {
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
}
