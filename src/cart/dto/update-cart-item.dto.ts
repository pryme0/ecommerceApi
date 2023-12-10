import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UpdateCartData {
  @ApiPropertyOptional({ description: 'quantity' })
  @IsNumber()
  quantity?: number;

  @ApiPropertyOptional({ description: 'total' })
  @IsNumber()
  total?: number;

  @ApiPropertyOptional({ description: 'bookId' })
  @IsString()
  bookId?: string;
}

export class UpdateCartDto {
  @ApiProperty({ description: 'id' })
  @IsString()
  id: string;

  @ApiProperty({ description: 'Cart update data', type: UpdateCartData })
  data: UpdateCartData;
}

export class RemoveBookFromCartDto {
  @ApiProperty({ description: 'cartId' })
  @IsString()
  cartId: string;

  @ApiProperty({ description: 'bookId' })
  @IsString()
  bookId: string;
}

export class ResponseMessageDto {
  @ApiProperty({ description: 'message' })
  @IsString()
  message: string;
}

export class ResetCartDto {
  @ApiProperty({ description: 'cartId' })
  @IsString()
  cartId: string;
}
