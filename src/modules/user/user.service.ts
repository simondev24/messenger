import { Injectable } from '@nestjs/common';
import { User } from 'prisma/prisma-client'
import { PrismaModule } from '../prisma/prisma.module';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  private readonly users: User[];

  constructor() {}

  create(user: User) {
    
    return user.id;
  }

  findAll(): User[] {
    return this.users;
  }

  login(bodyRequest: string) {
    console.log(bodyRequest);
  }

  userExists(userName: string) {
    
  }

}