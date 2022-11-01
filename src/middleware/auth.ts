import jwt, { SignOptions } from 'jsonwebtoken';
require('dotenv').config();
import config from 'config';
import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { RedisModule } from 'src/modules/redis/redis.module';
import { RedisFunctionFlags } from '@redis/client/dist/lib/commands/generic-transformers';
import { RedisService } from 'src/modules/redis/redis.service';


@Injectable()
export class Auth implements NestMiddleware {
    apply: any;
    constructor(private redisService: RedisService) {
    }

    async use(req: Request, res: Response, next: NextFunction) {
      //this.validateSession();
      console.log("Auth middleware works!");
      await this.redisService.setPair('somelogin', 'sometoken');
      next();
  } 

    async signJwt(login: string) {
        const privateKey = Buffer.from(
          config.get<string>('PRIVATE_KEY'),
          'base64'
        ).toString('ascii');

        let token = await jwt.sign(login, privateKey, {
          algorithm: 'RS256',
        });
        this.redisService.setPair(login, token);
    };

    async validateSession(login: string) {
      let sessionExists = await this.sessionExists(login);
      if(sessionExists) {
        return this.verifyJwt(login);
      }
      throw new HttpException('You have to be logged in to view this page', 403);
    }

    async sessionExists(login: string) {
      const value = await this.redisService.redisClient.get(login);
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