import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateCartDto {
  @ApiProperty({ description: 'quantity' })
  @IsNumber()
  quantity: number;
}
