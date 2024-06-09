import type { MessageDTO } from './messageDTO';

export class ReadMessageDTO {
  meta_data: {
    seen_user_id: number;
    conv_id: number;
  };
  message: MessageDTO;
}
