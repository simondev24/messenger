import { Body, Controller, Get, HttpException, Post, Req, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from '@nestjs/common';
import { LoginUserDto, RegisterUserDto } from './dto';
import { create } from 'domain';


@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Get('all')
    getAllUsers() {
        return this.userService.findAll();
    }

    @Post('register')
    createUser(@Body() userData: RegisterUserDto) {
        return this.userService.create(userData);
    }

    @Post('login')
    login(@Body() userData: LoginUserDto) {
        console.log(userData);
        return this.userService.login(userData);
    }

}