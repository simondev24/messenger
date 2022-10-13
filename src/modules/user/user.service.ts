import { Injectable } from '@nestjs/common';
import { User } from 'prisma/prisma-client'
import { PrismaModule } from '../prisma/prisma.module';
import { LoginUserDto, RegisterUserDto } from './dto';
import * as argon from 'argon2';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  private readonly users: User[];

  constructor(private prisma: PrismaService) {}

  async create(userData: RegisterUserDto) {
    if (!this.userExists(userData.name)) {
      return 'User already exists!';
    } else {
      const hash = await argon.hash(userData.password);
      const user: User = await this.prisma.user.create({
        data: {
          name: userData.name,
          password: hash,
          email: userData.email,
          isActive: true
        }
      });
      return user;
    }
  }

  async findByName(name: string): Promise<User[]> {
      let usersFound = await this.prisma.user.findMany({
        where: {
          name: name
        }
      });
      if (usersFound.length == 0) {
        throw new Error("User was not found");
      }
      return usersFound;
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async login(dto: LoginUserDto) {
    
  }

  async userExists(userName: string) {
    if ((await this.findByName(userName)).length != 0) {
      return false;
    }
    return true;
  }

}