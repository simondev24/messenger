import { Module, NestModule } from '@nestjs/common';
import { MiddlewareConfigProxy, MiddlewareConsumer } from '@nestjs/common/interfaces';
import { AuthMiddleware } from '../../middleware/auth';
import { RedisService } from '../redis/redis.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';
import { DatabaseModule } from '../typeorm/typeorm.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/User';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, AuthMiddleware, RedisService, AuthService],
})

export class UserModule {
}
