import type { MessageDTO } from './messageDTO';

export class SendMessageDTO {
  conv_id: number;
  message: MessageDTO;
}
