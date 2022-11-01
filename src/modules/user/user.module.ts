import { Module, NestModule } from '@nestjs/common';
import { MiddlewareConfigProxy, MiddlewareConsumer } from '@nestjs/common/interfaces';
import { AuthMiddleware } from '../../middleware/auth';
import { RedisService } from '../redis/redis.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';

@Module({
  controllers: [UserController],
  providers: [UserService, AuthMiddleware, RedisService, AuthService],
})

export class UserModule {
}
