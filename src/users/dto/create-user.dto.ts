import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'email' })
  @IsString()
  email: string;

  @ApiProperty({ description: 'firstName' })
  @IsString()
  firstName: string;

  @ApiProperty({ description: 'lastName' })
  @IsString()
  lastName: string;

  @ApiProperty({ description: 'password' })
  @IsString()
  password: string;
}

export class LoginDto {
  @ApiProperty({ description: 'email' })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'password' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
