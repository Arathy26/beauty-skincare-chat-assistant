import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ChatService } from './chat.service';
import { SendMessageDto } from './dto/send-message.dto';
import { ChatResponseDto } from './dto/chat-response.dto';
  
@ApiTags('chat')//?
@Controller('chat')  //?
export class ChatController {
  constructor(private readonly chatService: ChatService) {}
//?
  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Send a skincare question and get the assistant's reply",
    description:
      'Sends the user message to OpenAI with a skincare-specific system prompt. ' +
      'Medical concerns are redirected to a dermatologist and off-topic questions ' +
      'are redirected to skincare. Valid requests always return 200, including redirects.',
  })
  @ApiResponse({
    status: 200,
    description: 'Assistant reply generated successfully.',
    type: ChatResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Validation failed: message was empty, not a string, or over 1000 characters.',
  })
  @ApiResponse({
    status: 429,
    description: 'Too many requests: limit is 10 per minute per IP.',
  })
  async handleMessage(@Body() dto: SendMessageDto): Promise<ChatResponseDto> {
    const reply = await this.chatService.generateAssistantReply(dto.message);
    return { reply };
  }
}
