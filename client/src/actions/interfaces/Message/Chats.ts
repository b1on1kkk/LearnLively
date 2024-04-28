import { ReactElement } from "react";

import { ChatType } from "../api/chatType";

import type { Student } from "../Students/Main";
import type { SeenMessages, TMessage } from "../api/newChat";

export interface TConversations {
  conversations: {
    id: number;
    type: ChatType;
    group_uuid: string;
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
  functionality: Array<MainMessageFunc>;
  seenMessages?: Array<SeenMessages>;
}

export interface ChatContent {
  chosenMessage: ChosenMessage | null;
  setChosenMessage: (c: ChosenMessage | null) => void;
  chosenConvId: ChosenConv | null;
}

export enum MessagActionKind {
  reply_message = "reply_message",
  edit_message = "edit_message",
  pin_message = "pin_message",
  copy_message = "copy_message",
  forward_message = "forward_message",
  delete_message = "delete_message",
  select_message = "select_message"
}

export interface ChosenMessage {
  type: MessagActionKind;
  message_data: TMessage;
}

export interface ChosenConv {
  id: number;
  group_uuid: string;
}
