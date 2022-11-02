import { Module, NestModule } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrismaModule } from './modules/prisma/prisma.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { ConversationModule } from './modules/conversation/conversation.module';

@Module({
  imports: [
    UserModule,
    PrismaModule,
    DashboardModule,
    ConversationModule
  ],
})
export class AppModule {
 
}