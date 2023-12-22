import { User } from "@/redux/user/slice";

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
export type CommunityMessage = {
  sender: User["data"],
  community: string,
  recipients: string[],
  message: string,
  createdAt?: string
  _id: string
}