import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { FindUserByIdDto } from 'src/users/dto/find-user.dto';

export class FindOrderDto {
  @ApiPropertyOptional({ description: 'totalAmount' })
  @IsNumber()
  @IsOptional()
  totalAmount?: number;

  @ApiPropertyOptional({ description: 'orderId' })
  @IsString()
  @IsOptional()
  id?: string;

  @ApiPropertyOptional({ description: 'orderId', type: FindUserByIdDto })
  @IsString()
  @IsOptional()
  user?: FindUserByIdDto;
}
