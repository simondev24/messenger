import { Body, Controller, Get, Headers, HttpException, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginUserDto, RegisterUserDto } from './dto';
import { Response, Request } from 'express';


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
    login(@Body() userData: LoginUserDto, @Headers('auth-token') authToken) {
        return this.userService.login(userData, authToken);

    }

}