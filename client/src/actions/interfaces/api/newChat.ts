import type { TConversations } from "../Message/Chats";

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
    users: {
      img_hash_name: string;
      name: string;
      lastname: string;
    };
  } | null;
  replies_to: number | null;
  users: {
    img_hash_name: string;
    name: string;
    lastname: string;
  };
  selected: boolean;
}

export interface TStartChat {
  chats: Array<TConversations>;
  message: Array<TMessage>;
}
