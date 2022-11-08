import { Body, Controller, Get, HttpException, Post, Req, Res, Headers } from '@nestjs/common';
import { ConversationService } from './conversation.service';


@Controller('conversation')
export class ConversationController {
    constructor(private conversationService: ConversationService) {}

    @Get('/')
    getAllUsers() {
        
    }

    @Get('all')
    getUserConversations(@Headers('auth-token') authToken) {
        return this.conversationService.getUserConversations(authToken);
    }
}