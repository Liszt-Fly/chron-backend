import { IsAlphanumeric, Length } from 'class-validator';

export class UserDto {
  @Length(3, 10, { message: 'Username must be between 3 and 10 characters' })
  username: string;
  @Length(6, 10, { message: 'Password must be between 6 and 10 characters' })
  @IsAlphanumeric()
  password: string;
}
