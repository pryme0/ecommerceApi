import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateBookData {
  @ApiPropertyOptional({
    description: 'title',
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({
    description: 'price',
  })
  @IsOptional()
  price?: number;

  @ApiPropertyOptional({
    description: 'thumbnail',
  })
  @IsOptional()
  thumbnail?: string;

  @ApiPropertyOptional({
    description: 'rating',
  })
  @IsOptional()
  @IsNumber()
  rating?: number;

  @ApiPropertyOptional({
    description: 'quantity',
  })
  @IsOptional()
  @IsNumber()
  quantity?: number;
}

export class UpdateBookDto {
  @ApiProperty()
  id: string;

  @ApiProperty({ description: 'Book update data', type: UpdateBookData })
  data: UpdateBookData;
}
