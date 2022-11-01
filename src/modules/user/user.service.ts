import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'prisma/prisma-client'
import { LoginUserDto, RegisterUserDto } from './dto';
import * as argon from 'argon2';
import { PrismaService } from '../prisma/prisma.service';


@Injectable()
export class UserService {
  private readonly users: User[];

  constructor(private prisma: PrismaService) {}

  async create(userData: RegisterUserDto) {
    if (await this.userExists(userData.name)) {
      return 'User with provided name already exists!';
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

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async login(loginData: LoginUserDto, authToken: string) {
    if (await this.userExists(loginData.name)) {
        return this.authenticate(loginData);
    }
    throw new HttpException('User with provided name was not found!', 404);
  }

  async authenticate(loginData: LoginUserDto) {
    let hashPassword = await this.prisma.user.findMany({
      where: {
        name: loginData.name, 
      },
      select: {
        password: true  
      }
    });
    if (await argon.verify(hashPassword.map((obj) => obj.password)[0], loginData.password)) {
      return HttpStatus.CREATED;
    }
      throw new HttpException("Password is incorrect", 400);
  }

  async userExists(userName: string) {
      if ((await this.findByName(userName) == false)) {
        return false;
      }
      return true;
  }

  async findByName(name: string): Promise<User[] | false> {
    let usersFound = await this.prisma.user.findMany({
      where: {
        name: name
      }
    });
    if (usersFound.length == 0) {
      return false;
    } 
    return usersFound;
  }

}