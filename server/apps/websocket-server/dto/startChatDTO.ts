type ChatType = 'private' | 'group';

export class startChatDTO {
  users_idx: Array<number>;
  chat_type: ChatType;
  message: string;
}
