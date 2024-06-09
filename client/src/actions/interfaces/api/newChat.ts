import type { TConversations } from "../Message/Chats";

interface UserMessagePayload {
  img_hash_name: string;
  name: string;
  lastname: string;
  external_status: "GOOGLE" | "OPEN_ID";
}

export interface TMessage {
  id: number;
  user_id: number;
  conversation_id: number;
  content: string;
  sent_at: string;
  delivered_at: string;
  edited: boolean;
  seen: boolean;
  messages: {
    content: string;
    users: UserMessagePayload;
  } | null;
  replies_to: number | null;
  users: UserMessagePayload;
  selected: boolean;
}

export interface TStartChat {
  chats: Array<TConversations>;
  message: Array<TMessage>;
}
