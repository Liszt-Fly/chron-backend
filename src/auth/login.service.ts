import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma/prisma.service';
import { UserDto } from 'src/dto/UserDto';
import { verify } from 'argon2';
@Injectable()
export class LoginService {
  constructor(private readonly prisma: PrismaService) {}

  async login(@Body() userInput: UserDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        username: userInput.username,
      },
    });
    //用户不存在
    if (!user) {
      //返回404
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    }
    //密码错误
    else if (!(await verify(user.password, userInput.password))) {
      throw new HttpException(
        'The password is not correct',
        HttpStatus.BAD_REQUEST,
      );
    }
    //登陆成功
    else {
      return user;
    }
  }
}
