import { Module, NestModule } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { ConversationModule } from './modules/conversation/conversation.module';
import { DatabaseModule } from './modules/typeorm/typeorm.module';

@Module({
  imports: [
    UserModule,
    DatabaseModule,
    DashboardModule,
    ConversationModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
        host: 'localhost',
        port: 3309,
        username: 'root',
        password: 'root',
        database: 'demoappdb',
        entities: [
            __dirname + '/../**/*.entity{.ts,.js}',
        ],
        synchronize: true,
    })
  ],
})
export class AppModule {}