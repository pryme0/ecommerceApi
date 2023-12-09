import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Timestamp } from 'typeorm';

export class FindByIdsDto {
  @ApiPropertyOptional({
    description: 'id',
  })
  id: {
    in: string[];
  };
}

export class FindBookDto {
  @ApiPropertyOptional({
    description: 'id',
  })
  @IsString()
  @IsOptional()
  id?: string;

  @ApiPropertyOptional({
    description: 'title',
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({
    description: 'price',
  })
  @IsString()
  @IsNumber()
  @IsOptional()
  price?: number;

  @ApiPropertyOptional({
    description: 'rating',
  })
  @IsNumber()
  @IsOptional()
  rating?: number;

  @ApiPropertyOptional({
    description: 'quantity',
  })
  @IsNumber()
  @IsOptional()
  quantity?: number;

  @ApiPropertyOptional({
    description: 'an array of book ids',
    type: FindByIdsDto,
  })
  @IsNumber()
  @IsOptional()
  ids?: FindByIdsDto;
}

export class FindByIdDto {
  @ApiProperty({
    description: 'id',
  })
  @IsString()
  id: string;
}
