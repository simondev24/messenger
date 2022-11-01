import { Global, MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AuthMiddleware } from "src/middleware/auth";
import { AuthService } from "../auth/auth.service";
import { RedisService } from "../redis/redis.service";
import { DashboardController } from "./dashboard.controller";
import { DashboardService } from "./dashboard.service";

@Module({
    controllers: [DashboardController],
    providers: [DashboardService, AuthService, RedisService],
})
export class DashboardModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
          .apply(AuthMiddleware)
          .forRoutes('dashboard');
      }
}