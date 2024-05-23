import type { Group, TConversations } from "../../interfaces/Message/Chats";

// define private or group chats
export function ChatGuard(data: TConversations | Group): data is Group {
  return (data as Group).group_name !== undefined;
}
