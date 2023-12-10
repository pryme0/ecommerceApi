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

  @ApiPropertyOptional({ description: 'orderId' })
  @IsString()
  @IsOptional()
  userId?: string;

  @ApiPropertyOptional({ description: 'Number of items to skip', type: Number })
  @IsOptional()
  page?: number;

  @ApiPropertyOptional({ description: 'Number of items to take', type: Number })
  @IsOptional()
  pageSize?: number;
}
