import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'prisma/prisma-client'
import * as argon from 'argon2';
import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import { jwt } from 'jsonwebtoken';
require('dotenv').config();

@Injectable()
export class AuthService {

  constructor(private redisService: RedisService) {}

  async createSession(login: string) {
    const privateKey = Buffer.from(
      <string>process.env.PRIVATE_KEY,
      'base64'
    ).toString('ascii');

    let token = await jwt.sign(login, privateKey, {
      algorithm: 'RS256',
      exp: Math.floor(Date.now() / 1000) + (60 * 60) // token valid 1 hour from creation time
    });
    this.redisService.setPair(token, login);
  };

  async validateSession(token: string) {
    if (token) {
      let sessionExists = await this.sessionExists(token);
      if(sessionExists) {
        return this.verifyJwt(token);
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
    
  async verifyJwt(token: string) {
      try {
          const publicKey = Buffer.from(
          <string>process.env.PUBLIC_KEY,
              'base64'
          ).toString('ascii');

          return jwt.verify(token, publicKey);
      } catch (error) {
        return null;
      }
  };
    
}