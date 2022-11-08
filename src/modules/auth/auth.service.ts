import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';
import { LoginUserDto } from '../user/dto';
const jwt = require("jsonwebtoken");
require('dotenv').config();

@Injectable()
export class AuthService {

  constructor(private redisService: RedisService) {}

  async createSession(loginData: LoginUserDto, userId): Promise<string> {
    let login: string = loginData.name;
    let password: string = loginData.password;

    let token = await jwt.sign(
      {
        login,
        password
      },
      process.env.PRIVATE_KEY,
      {
        algorithm: 'RS256',
        expiresIn: 3600
      }
    );
    this.redisService.setPair(token, login);
    return token;
  };

  async validateSession(token: string) {
    if (token) {
      if(await this.sessionExists(token)) {
        const tokenVerification = await this.verifyToken(token);
        return tokenVerification;
      }
    }
    return false;
  }

  async sessionExists(token: string) {
    const value = await this.redisService.redisClient.get(token);
    if (value) {
      return true;
    }
    return false;
  }
    
  async verifyToken(token: string) {
      try {
          /*const publicKey = Buffer.from(
          <string>process.env.PUBLIC_KEY,
              'base64'
          ).toString('ascii');*/
          const verification = await jwt.verify(token, process.env.PUBLIC_KEY, {expiresIn: 3600, algorithm: 'RS256'});
          if (await this.redisService.redisClient.get(token) == verification['login']) {
            return true;
          }
      } catch (error) {
        return false;
      }
  };

}