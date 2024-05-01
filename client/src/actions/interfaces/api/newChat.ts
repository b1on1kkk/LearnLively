import type { TConversations } from "../Message/Chats";
import type { User } from "../Registration/Validation";

export interface SeenMessages {
  message_id: number;
  seen_at: Date;
  users: Pick<User, "img_hash_name" | "name" | "lastname">;
}

export interface TMessage {
  id: number;
  user_id: number;
  conversation_id: number;
  content: string;
  sent_at: Date;
  delivered_at: Date;
  edited: boolean;
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
  seen_messages: Array<SeenMessages>;
}

export interface TStartChat {
  chats: Array<TConversations>;
  message: Array<TMessage>;
}
