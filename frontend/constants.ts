import { ChatSession } from './types';

export const SUGGESTED_PROMPTS: readonly string[] = [
  'How do I know if I have combination skin?',
  'What does niacinamide actually do?',
  'What order should I apply my AM skincare products in?',
  'What should I look for in a gentle cleanser?',
];

// Demo starts with an empty history — no fake unrelated chats sitting
// in the sidebar during a live demo.
export const MOCK_CHATS: ChatSession[] = [];