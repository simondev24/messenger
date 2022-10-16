import { Body, Controller, Get, HttpException, Post, Req, Res } from '@nestjs/common';
import { DashboardService } from './dashboard.service';


@Controller('dashboard')
export class DashboardController {
    constructor(private dashboardService: DashboardService) {}

}