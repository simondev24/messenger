import { Module, NestModule } from '@nestjs/common';
import { Auth } from 'src/middleware/auth';
import { UserService } from '../user/user.service';
import { RedisService } from './redis.service';


@Module({
  providers: [RedisService],
  exports: [RedisModule]
})
export class RedisModule implements NestModule {
  configure(consumer: Auth): void | Auth {
    consumer.apply(Auth).forRoutes(UserService)
  }
}
