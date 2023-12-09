import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class FindUserDto {
  @ApiPropertyOptional({ description: 'email' })
  @IsString()
  @IsOptional()
  email: string;

  @ApiPropertyOptional({ description: 'id' })
  @IsString()
  @IsOptional()
  id: string;
}

export class FindUserByIdDto {
  @ApiProperty({ description: 'id' })
  @IsString()
  @IsNotEmpty()
  id: string;
}
