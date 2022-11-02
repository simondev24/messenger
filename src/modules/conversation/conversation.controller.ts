import { Body, Controller, Get, HttpException, Post, Req, Res } from '@nestjs/common';
import { ConversationService } from './conversation.service';


@Controller('conversation')
export class ConversationController {
    constructor(private conversationService: ConversationService) {}

    @Get('/')
    getAllUsers() {
        
    }

    @Get('all')
    getUserConversations(@Body() userId: number) {
        return this.conversationService.getUserConversations(userId);
    }
}