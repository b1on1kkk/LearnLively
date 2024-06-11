import type { MessageDTO } from './messageDTO';

export class DeleteMessagesDTO {
  conv_id: number;
  user_id: number;
  message: Array<MessageDTO>;
}
