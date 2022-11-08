import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginUserDto, RegisterUserDto } from './dto';
import * as argon from 'argon2';
import { AuthService } from '../auth/auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entity/User';

@Injectable()
export class UserService {
  private readonly users: User[];

  constructor(@InjectRepository(User) private userRepository: Repository<User>, private authService: AuthService) {}

  async create(userData: RegisterUserDto) {
    if (await this.userExists(userData.name)) {
      return 'User with provided name already exists!';
    } else {
      const hash = await argon.hash(userData.password);
      const user: User = await this.userRepository.save({
        name: userData.name,
        password: hash,
        email: userData.email,
        isActive: true
      });
      return user;
    }
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async login(loginData: LoginUserDto, sessionToken: string) {
    const userId = await this.userExists(loginData.name);
    if (userId) {
        const authenticated = await this.authenticate(loginData);
        if (true /*authenticated*/) {
          if (await this.authService.sessionExists(sessionToken)) {
            return {"message": "Already logged in!"};
          }
          return {"auth-token": await this.authService.createSession(loginData, userId)};
        } else {
          return HttpStatus.UNAUTHORIZED;
        }
    }
    throw new HttpException('User with provided name was not found!', 404);
  }

  async authenticate(loginData: LoginUserDto) {
    let hashPassword = await this.userRepository.createQueryBuilder('user')
      .select(['user.password']).where('user.name = :name', {name: loginData.name});
   /* if (await argon.verify(hashPassword, loginData.password)) {
      return true;
    }*/
      throw new HttpException("Password is incorrect", 400);
  }

  async userExists(userName: string) {
      return await this.findUserId(userName);
  }

  async findUserId(name: string) {
    return await this.userRepository.createQueryBuilder('user').select(['user.id']).where('user.name =');
  }

}