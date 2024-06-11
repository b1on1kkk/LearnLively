import { ReactElement } from "react";

import { ChatType } from "../api/chatType";

import type { Student } from "../Students/Main";
import type { TMessage } from "../api/newChat";

export interface TConversations {
  conversations: {
    id: number;
    type: ChatType;
    conversation_hash: string;
    last_message: {
      content: string;
      seen: boolean;
      sent_at: string;
      user_id: number;
    } | null;
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
  id: number;
  message: TMessage;
  children: ReactElement;
  wrapper: string;
  onClickAction: React.MouseEventHandler<HTMLLIElement>;
  functionality: Array<MainMessageFunc>;
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
}

export interface TGroupChatModal {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
}

export interface Group {
  id: number;
  conversation_id: number;
  group_name: string;
  description: string;
  conversations: {
    id: number;
    type: ChatType;
    conversation_hash: string;
    last_message: {
      content: string;
      seen: boolean;
      sent_at: string;
      user_id: number;
      users: {
        name: string;
      };
    };
  };
  group_users: Array<{
    users: Student;
  }>;
}

export interface TGroups {
  groups: Group;
}

export interface TChatCard {
  uuid_code: string;
  data: TConversations | Group;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

export interface whoIsTyping {
  conv_id: number;
  user: { id: number; name: string };
}

export interface TSeenMessages {
  seen_at: string;
}

export interface ConfirmationPayload {
  isOpen: boolean;
  onOpenChange: () => void;
}
