import { Body, Controller, Post } from '@nestjs/common';
import { RegisterService } from './register.service';
import { UserDto } from 'src/dto/UserDto';
import { LoginService } from './login.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerService: RegisterService,
    private readonly loginService: LoginService,
  ) {}
  @Post('register')
  register(@Body() data: UserDto) {
    return this.registerService.createUser(data);
  }
  @Post('login')
  login(@Body() data: UserDto) {
    return this.loginService.login(data);
  }
}
