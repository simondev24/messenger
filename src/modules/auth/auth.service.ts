import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'prisma/prisma-client'
import * as argon from 'argon2';
import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import jwt, { SignOptions } from 'jsonwebtoken';
require('dotenv').config();
import config from 'config';

@Injectable()
export class AuthService {

  constructor(private redisService: RedisService) {}

  async createSession(login: string) {
    const privateKey = Buffer.from(
      config.get<string>('PRIVATE_KEY'),
      'base64'
    ).toString('ascii');

    let token = await jwt.sign(login, privateKey, {
      algorithm: 'RS256',
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
    return new HttpException('You have to be logged in to view this page', 403);
  }

  async sessionExists(token: string) {
    const value = await this.redisService.redisClient.get(token);
    if (value != 'nil') {
      return true;  
    }
    return false;
  }
    
  async verifyJwt(token: string) {
      try {
          const publicKey = Buffer.from(
          config.get<string>('PUBLIC_KEY'),
              'base64'
          ).toString('ascii');

          return jwt.verify(token, publicKey);
      } catch (error) {
        return null;
      }
  };
    
}