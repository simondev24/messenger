import { Module, NestModule } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrismaModule } from './modules/prisma/prisma.module';
import { Auth } from './middleware/auth';
import { UserService } from './modules/user/user.service';

@Module({
  imports: [
    UserModule,
    PrismaModule
  ],
})
export class AppModule {
 
}