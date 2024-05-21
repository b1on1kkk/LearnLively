import { startChatDTO } from './startChatDTO';

export interface CreateGroupDTO extends Exclude<startChatDTO, 'messages'> {
  group_name: string;
  description: string;
  owner_id: number;
}
