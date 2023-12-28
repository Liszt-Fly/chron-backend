import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { RegisterService } from './register.service';
import { LoginService } from './login.service';

@Module({
  controllers: [AuthController],
  providers: [RegisterService, LoginService],
})
export class AuthModule {
  register() {}
}
