export class Message {
  id: number;
  user_id: number;
  conversation_id: number;
  content: string;
  sent_at: Date;
  delivered_at: Date;
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
