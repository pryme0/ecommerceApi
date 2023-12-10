import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsArray, ArrayUnique } from 'class-validator';

export class CreateBookDto {
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
  @IsArray()
  @ArrayUnique()
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
}
