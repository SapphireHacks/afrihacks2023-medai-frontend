

export type Message = {
  conversationOwner: string
  conversation: string
  content: string
  role: "user"| "assistant"| "system"
}