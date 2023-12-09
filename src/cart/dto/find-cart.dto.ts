import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class FindCardByIdDto {
  @ApiProperty({ description: 'id' })
  @IsString()
  @IsNotEmpty()
  id: string;
}

export class FindCartDto {
  @ApiPropertyOptional({ description: 'id' })
  @IsOptional()
  id?: string;

  @ApiPropertyOptional({
    description: 'Quantity of items in the cart',
    type: String,
  })
  @IsNumber()
  @IsOptional()
  quantity?: number;
}
