import { Global, Module } from "@nestjs/common";
import { DashboardController } from "./dashboard.controller";
import { DashboardService } from "./dashboard.service";

@Global()
@Module({
    controllers: [DashboardController],
    providers: [DashboardService],
})
export class PrismaModule {}