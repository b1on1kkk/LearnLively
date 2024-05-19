import type { MessageDTO } from './messageDTO';

export class DeleteMessagesDTO {
  conv_id: number;
  message: Array<MessageDTO>;
}
