import type { MessageDTO } from './messageDTO';

export class SendMessageDTO {
  uuid: string;
  message: MessageDTO;
}
