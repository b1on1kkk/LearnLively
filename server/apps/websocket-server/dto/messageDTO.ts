export class MessageDTO {
  id: number;
  user_id: number;
  conversation_id: number;
  content: string;
  sent_at: string;
  delivered_at: string;
  edited: boolean;
  messages: {
    content: string;
    users: {
      img_hash_name: string;
      name: string;
      lastname: string;
      external_status: 'GOOGLE' | 'OPEN_ID';
    };
  } | null;
  replies_to: number | null;
  users: {
    img_hash_name: string;
    name: string;
    lastname: string;
    external_status: 'GOOGLE' | 'OPEN_ID';
  };
  selected: boolean;
}
