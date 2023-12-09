import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CartDto } from 'src/cart/dto';
import { OrderDto } from 'src/orders/dto/order.dto';
import { Timestamp } from 'typeorm';

export class UserDto {
  @ApiProperty({ description: 'email' })
  @IsString()
  id: string;

  @ApiProperty({ description: 'email' })
  @IsString()
  email: string;

  @ApiProperty({ description: 'email' })
  @IsString()
  firstName: string;

  @ApiProperty({ description: 'email' })
  @IsString()
  lastName: string;

  @ApiProperty({ description: 'email' })
  @IsString()
  password: string;

  @ApiProperty({ description: 'cart', type: () => [OrderDto] })
  orders: OrderDto[];

  @ApiProperty({ description: 'cart', type: CartDto })
  cart: CartDto;

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

export class LoginResponseDto {
  @ApiProperty({
    description: 'User Dto',
    type: () => UserDto,
  })
  user: UserDto;

  @ApiProperty({ description: 'User access token' })
  accessToken: string;

  @ApiProperty({ description: 'User Cart', type: () => CartDto })
  cart: CartDto;
}
