export type ChatRoleType = "system" | "user" | "assistant";

export type ChatMessage = {
  id: string;
  role: ChatRoleType;
  content: string;
  isPreamble?: boolean;
  isImportant?: boolean;
};

export type Chat = {
  id: string;
  summary: string;
  botTyping: boolean;
  botTypingMessage: {
    role?: ChatRoleType;
    content?: string;
  } | null;
  draft: string;
  //Record(chatMessageSchema)
  history: Record<string, ChatMessage>;
};

export type ChatState = {
  activeId: string | null;
  chats: Record<string, Chat>;
};

export const NEW_CHAT_DEFAULT = "New Chat";
