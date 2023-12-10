export type Message = {
  conversationOwner: string;
  conversation: string;
  content: string;
  role: 'user' | 'assistant' | 'system';
};
export type Conversation = {
  _id: string;
  title: string;
  participants: string[];
  messages: Message[];
  hasOlderMessages: boolean;
  createdAt: string;
  updatedAt: string;
};
