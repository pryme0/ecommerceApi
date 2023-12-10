import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNumberString, IsString } from 'class-validator';
import { Timestamp } from 'typeorm';
import { Transform } from 'class-transformer';

export class BookDto {
  @ApiProperty({
    description: 'id',
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: 'title',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'price',
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    description: 'thumbnail',
  })
  thumbnail: string;

  @ApiProperty({
    description: 'tags',
    type: [String],
  })
  tags: string[];

  @ApiProperty({
    description: 'rating',
  })
  @IsNumber()
  rating: number;

  @ApiProperty({
    description: 'quantity',
  })
  @IsNumber()
  quantity: number;

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

export class FindBookAndCountResponse {
  @ApiProperty({
    description: 'books',
    type: () => [BookDto],
  })
  books: BookDto[];

  @ApiProperty({
    description: 'Query count',
  })
  count: number;
}
