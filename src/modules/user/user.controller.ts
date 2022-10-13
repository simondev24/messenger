import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from '@nestjs/common';
import { UserDto } from './dto';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Get('all')
    getAllUsers() {
        return this.userService.findAll();
    }

    @Post('register')
    createUser() {
        
    }

    @Post('login')
    login(@Body('name') name: string, @Body('password') password: string) {
        console.log({name, password});
        return this.userService.login(name);
    }

}