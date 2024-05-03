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

type COLORS =
  | "danger"
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | undefined;

export interface MainMessageFunc {
  id: number;
  key: string;
  startContent: ReactElement;
  classNames: { title: string };
  value: string;
  color: COLORS;
}

export interface TMessageEditions {
  children: ReactElement;
  wrapper: string;
  onClickAction: React.MouseEventHandler<HTMLLIElement>;
  functionality: Array<MainMessageFunc>;
  seenMessages?: Array<SeenMessages>;
}

export enum MessageActionKind {
  reply_message = "reply_message",
  edit_message = "edit_message",
  pin_message = "pin_message",
  copy_message = "copy_message",
  forward_message = "forward_message",
  delete_message = "delete_message",
  select_message = "select_message"
}

export interface ChosenMessage {
  type: MessageActionKind;
  message_data: TMessage;
}

export interface ChosenConv {
  id: number;
  uuid: string;
}
