require('dotenv').config();
import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { AuthService } from 'src/modules/auth/auth.service';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    apply: any;
    
    constructor(private authService: AuthService) {}

    async use(req: Request, res: Response, next: NextFunction) {
      const validated = await this.authService.validateSession(req.get('Auth-token'));
      if (!validated) {
        res.writeHead(401, { 'content-type': 'application/json' })
        res.write('You have to be logged in to view this page')
        res.end()
        return
      }
      console.log("Auth middleware works!");
      next();
  }

}