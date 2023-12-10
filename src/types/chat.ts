export type Message = {
  conversationOwner: string;
  conversation: string;
  content: string;
  role: 'user' | 'assistant' | 'system';
  _id: string,
  createdAt?: string
};
export type Conversation = {
  _id: string;
  title: string;
  participants: string[];
  createdAt: string;
  updatedAt: string;
};
