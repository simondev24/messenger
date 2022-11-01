require('dotenv').config();
import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { AuthService } from 'src/modules/auth/auth.service';


@Injectable()
export class AuthMiddleware implements NestMiddleware {
    apply: any;
    
    constructor(private authService: AuthService) {}

    async use(req: Request, res: Response, next: NextFunction) {
      this.authService.validateSession(req.headers['Auth-token']);
      console.log("Auth middleware works!");
      next();
  }

}