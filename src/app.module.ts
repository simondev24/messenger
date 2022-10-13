import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrismaModule } from './modules/prisma/prisma.module';

@Module({
  imports: [
    UserModule,
    PrismaModule
  ],
})
export class AppModule {}