import { ReactElement } from "react";

import { ChatType } from "../api/chatType";

import type { Student } from "../Students/Main";

export interface TConversations {
  conversations: {
    id: number;
    type: ChatType;
    users_conversations: Array<{
      users: Student;
    }>;
  };
}

export interface TChats {
  users_conversations: Array<TConversations>;
}

export interface MainMessageFunc {
  id: number;
  key: string;
  startContent: ReactElement;
  classNames: { title: string };
  value: string;
  color?: "danger" | string;
}

export interface TMessageEditions {
  children: ReactElement;
  wrapper: string;
  onClickAction: React.MouseEventHandler<HTMLLIElement>;
  lastSeen?: Date;
  functionality: Array<MainMessageFunc>;
}

export interface ChatContent {
  chosenConvId: number | null;
}
