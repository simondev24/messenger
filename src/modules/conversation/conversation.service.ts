import { Injectable } from "@nestjs/common";

@Injectable()
export class ConversationService {
    
    async getUserConversations(userId: number) {
        return [{'id': '1', 'name': 'conversation1'}, {'id': '2', 'name': 'conversation2'}];
    }
}
