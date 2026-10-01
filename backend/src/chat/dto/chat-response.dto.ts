import { ApiProperty } from '@nestjs/swagger';

// Describes the shape of a successful /chat response, purely for Swagger
// documentation (Section 10: "Show ... response structures"). Not used for
// validation — the controller still just returns a plain { reply } object.
export class ChatResponseDto {
  @ApiProperty({
    description:
      'The assistant\'s reply — a domain-scoped skincare answer, or a ' +
      'medical/off-topic redirect, per the two-tier logic in Section 8.',
    example:
      'Niacinamide (vitamin B3) helps regulate oil production, strengthens ' +
      'the skin barrier, and can reduce the look of pores over time.',
  })
  reply: string;
}