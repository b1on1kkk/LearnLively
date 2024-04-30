export class MessageDTO {
  uuid: string;
  message: {
    id: number;
    user_id: number;
    conversation_id: number;
    content: string;
    sent_at: Date;
    delivered_at: Date;
    edited: boolean;
    users: {
      img_hash_name: string;
      name: string;
      lastname: string;
    };
    seen_messages: any[];
  };
}
