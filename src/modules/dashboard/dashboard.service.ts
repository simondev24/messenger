import { Injectable } from "@nestjs/common";

@Injectable()
export class DashboardService {
    async getUserDashboard() {
        return 'user dashboard returned';
    }
}
