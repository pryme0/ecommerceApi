import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateUserData {
  @ApiPropertyOptional({ description: 'email' })
  @IsString()
  @IsOptional()
  email: string;

  @ApiPropertyOptional({ description: 'firstName' })
  @IsString()
  @IsOptional()
  firstName: string;

  @ApiPropertyOptional({ description: 'lastName' })
  @IsString()
  @IsOptional()
  lastName: string;
}

export class UpdateUserDto {
  @ApiProperty({ description: 'id' })
  @IsString()
  id: string;

  @ApiProperty({ description: 'Update data', type: UpdateUserData })
  @IsString()
  data: UpdateUserData;
}

export class UpdateResultDto {
  @ApiPropertyOptional({ description: 'raw sql returned ' })
  @IsString()
  @IsOptional()
  raw: string;

  @ApiPropertyOptional({ description: 'Number of affected rows' })
  @IsNumber()
  @IsOptional()
  affected: number;
}
