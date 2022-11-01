import { Module, NestModule } from '@nestjs/common';
import { AuthMiddleware } from 'src/middleware/auth';
import { UserService } from '../user/user.service';
import { RedisService } from './redis.service';


@Module({
  providers: [RedisService],
  exports: [RedisModule]
})
export class RedisModule implements NestModule {
  configure(consumer: AuthMiddleware): void | AuthMiddleware {
    consumer.apply(AuthMiddleware).forRoutes(UserService)
  }
}
