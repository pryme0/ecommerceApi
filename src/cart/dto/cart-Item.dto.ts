import { BookDto } from 'src/books/dto';
import { CartDto } from './cart.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CartItemDto {
  @ApiProperty({
    description: 'Item cart',
    type: () => CartDto,
  })
  cart: CartDto;

  @ApiProperty({
    description: 'Item book',
    type: BookDto,
  })
  book: BookDto;

  @ApiProperty({
    description: 'Item quantity',
  })
  quantity: number;
}
