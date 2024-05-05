import type { MessageDTO } from './messageDTO';

export class DeleteMessagesDTO {
  meta_data: {
    uuid: string;
    conversation_id: number;
  };
  message: Array<MessageDTO>;
}
