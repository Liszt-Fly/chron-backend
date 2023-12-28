import { BadRequestException, Injectable } from '@nestjs/common';
import { hash } from 'argon2';
import { plainToClass } from 'class-transformer';
import { PrismaService } from 'src/db/prisma/prisma.service';
import { UserDto } from 'src/dto/UserDto';
@Injectable()
export class RegisterService {
  constructor(private readonly prismaServcie: PrismaService) {}
  async createUser(userInput: UserDto) {
    //首先判断user是否存在
    const RepeatUser = await this.prismaServcie.user.findUnique({
      where: {
        username: userInput.username,
      },
    });
    if (RepeatUser) {
      throw new BadRequestException('用户名已存在');
    }
    const userData = plainToClass(UserDto, userInput);
    //使用argon2处理密码
    let password = await hash(userInput.password);
    let user = await this.prismaServcie.user.create({
      data: {
        username: userInput.username,
        password,
      },
    });
    return user;
  }
}
