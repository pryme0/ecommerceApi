import { ApiProperty } from '@nestjs/swagger';
import { BookDto } from 'src/books/dto/book.dto';
import { UserDto } from 'src/users/dto';
import { Timestamp } from 'typeorm';
import { CartItemDto } from './cart-Item.dto';

export class CartDto {
  @ApiProperty({
    description: 'Cart Id',
    type: String,
  })
  id: string;

  @ApiProperty({
    description: 'Quantity of items in the cart',
  })
  quantity: number;

  @ApiProperty({
    description: 'Total cost of items in the cart',
  })
  total: number;

  @ApiProperty({
    description: 'Cart books',
    type: () => [CartItemDto],
  })
  books: CartItemDto[];

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
