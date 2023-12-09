import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { BookDto } from 'src/books/dto/book.dto';
import { UserDto } from 'src/users/dto';
import { Timestamp } from 'typeorm';

export class OrderDto {
  @ApiProperty({
    description: 'totalAmount',
  })
  @IsNumber()
  id: string;

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
