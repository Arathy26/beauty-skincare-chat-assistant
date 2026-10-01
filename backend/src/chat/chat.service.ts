import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { SKINCARE_SYSTEM_PROMPT, AI_UNAVAILABLE_MESSAGE } from './chat.data';

@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);
  private readonly openai: OpenAI;
  private readonly model: string;

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('OPENAI_API_KEY');
    this.model = this.configService.get<string>('OPENAI_MODEL') ?? 'gpt-4o-mini';

    if (!apiKey) {
      // Fail loudly at startup rather than silently later — you WANT to
      // know immediately if the key didn't load, not mid-demo.
      throw new Error(
        'OPENAI_API_KEY is not set. Add it to backend/.env before starting the server.',
      );
    }

    this.openai = new OpenAI({ apiKey });
  }

  async generateAssistantReply(message: string): Promise<string> {
    try {
      const completion = await this.openai.chat.completions.create({
        model: this.model,
        messages: [
          { role: 'system', content: SKINCARE_SYSTEM_PROMPT },
          { role: 'user', content: message },
        ],
        max_tokens: 300,
      });

      return completion.choices[0]?.message?.content ?? AI_UNAVAILABLE_MESSAGE;
    } catch (error) {
      this.logger.error(`OpenAI call failed: ${(error as Error).message}`);
      return AI_UNAVAILABLE_MESSAGE;
    }
  }
}