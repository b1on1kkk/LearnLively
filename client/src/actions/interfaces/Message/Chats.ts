import { ChatType } from "../api/chatType";

import type { Student } from "../Students/Main";

interface TConversations {
  conversations: {
    type: ChatType;
    users_conversations: Array<{
      users: Student;
    }>;
  };
}

export interface TChats {
  users_conversations: Array<TConversations>;
}
