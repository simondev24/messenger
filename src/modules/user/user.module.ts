import { Module, NestModule } from '@nestjs/common';
import { MiddlewareConfigProxy, MiddlewareConsumer } from '@nestjs/common/interfaces';
import { Auth } from 'src/middleware/auth';
import { RedisService } from '../redis/redis.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, Auth, RedisService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(Auth)
      .forRoutes('user');
  }
}