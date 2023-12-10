import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { BookDto } from 'src/books/dto/book.dto';
import { UserDto } from 'src/users/dto';
import { Timestamp } from 'typeorm';
import { Cart } from 'src/cart/entities/cart.entity';
import { CartDto } from 'src/cart/dto';

export class OrderDto {
  @ApiProperty({
    description: 'totalAmount',
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: 'totalAmount',
  })
  @IsString()
  status: string;

  @ApiProperty({
    description: 'totalAmount',
  })
  @IsNumber()
  totalAmount: number;

  @ApiProperty({
    description: 'user',
    type: () => UserDto,
  })
  user: UserDto;

  @ApiProperty({
    description: 'books',
    type: BookDto,
  })
  books: BookDto[];

  @ApiProperty({
    description: 'Creation date',
    type: String,
    format: 'date-time',
  })
  createdAt: Timestamp;

  @ApiProperty({
    description: 'Updated dated',
    type: String,
    format: 'date-time',
  })
  updatedAt: Timestamp;
}

export class CreateOrderResponse {
  @ApiProperty({
    description: 'Created Order',
    type: OrderDto,
  })
  order: OrderDto;

  @ApiProperty({
    description: 'Updated cart',
    type: CartDto,
  })
  cart: CartDto;
}

export class FindOrderAndCountResponse {
  @ApiProperty({
    description: 'Orders',
    type: () => [OrderDto],
  })
  orders: OrderDto[];

  @ApiProperty({
    description: 'Query count',
  })
  count: number;
}
