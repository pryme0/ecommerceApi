import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { UserDto } from 'src/users/dto';

export class CreateOrderDto {
  @ApiProperty({ description: 'books', type: [String] })
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  bookIds: string[];

  @ApiProperty({ description: 'cartId' })
  @IsNotEmpty()
  @IsString()
  cartId: string;
}
