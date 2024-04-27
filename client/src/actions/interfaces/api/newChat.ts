import type { TConversations } from "../Message/Chats";

export interface TMessage {
  user_id: number;
  conversation_id: number;
  content: string;
  sent_at: Date;
  delivered_at: Date;
  seen_at: Date;
  users: {
    img_hash_name: string;
    name: string;
    lastname: string;
  };
}

export interface TStartChat {
  chats: Array<TConversations>;
  message: Array<TMessage>;
}
