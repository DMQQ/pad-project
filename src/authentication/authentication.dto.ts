import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsStrongPassword,
} from 'class-validator';

export class AccountInput {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
