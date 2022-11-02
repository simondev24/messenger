import { Global, MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AuthMiddleware } from "src/middleware/auth";
import { AuthService } from "../auth/auth.service";
import { RedisService } from "../redis/redis.service";
import { ConversationController } from "./conversation.controller";
import { ConversationService } from "./conversation.service";

@Module({
    controllers: [ConversationController],
    providers: [ConversationService, AuthService, RedisService],
})
export class ConversationModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
          .apply(AuthMiddleware)
          .forRoutes('conversation');
      }
}