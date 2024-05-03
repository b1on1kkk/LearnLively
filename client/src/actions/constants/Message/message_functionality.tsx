import {
  MessageSquareReply,
  Pencil,
  Pin,
  Copy,
  Forward,
  Trash,
  CircleCheck
} from "lucide-react";

import type { MainMessageFunc } from "../../interfaces/Message/Chats";

export const MAIN_MESSAGE_FUNCTIONALITY_SENDER: Array<MainMessageFunc> = [
  {
    id: 0,
    key: "reply_message",
    startContent: <MessageSquareReply width={19} height={19} />,
    classNames: {
      title: "font-semibold"
    },
    value: "Reply",
    color: "primary"
  },
  {
    id: 1,
    key: "edit_message",
    startContent: <Pencil width={19} height={19} />,
    classNames: {
      title: "font-semibold"
    },
    value: "Edit",
    color: "primary"
  },
  {
    id: 2,
    key: "pin_message",
    startContent: <Pin width={19} height={19} />,
    classNames: {
      title: "font-semibold "
    },
    value: "Pin",
    color: "primary"
  },
  {
    id: 3,
    key: "copy_message",
    startContent: <Copy width={19} height={19} />,
    classNames: {
      title: "font-semibold"
    },
    value: "Copy Text",
    color: "primary"
  },
  {
    id: 4,
    key: "forward_message",
    startContent: <Forward width={19} height={19} />,
    classNames: {
      title: "font-semibold"
    },
    value: "Forward",
    color: "primary"
  },
  {
    id: 5,
    key: "delete_message",
    startContent: <Trash width={19} height={19} />,
    classNames: {
      title: "font-semibold"
    },
    value: "Delete",
    color: "danger"
  },
  {
    id: 6,
    key: "select_message",
    startContent: <CircleCheck width={19} height={19} />,
    classNames: {
      title: "font-semibold"
    },
    value: "Select",
    color: "primary"
  }
];

export const MAIN_MESSAGE_FUNCTIONALITY_OTHERS: Array<MainMessageFunc> = [
  {
    id: 0,
    key: "reply_message",
    startContent: <MessageSquareReply width={19} height={19} />,
    classNames: {
      title: "font-semibold"
    },
    value: "Reply",
    color: "primary"
  },
  {
    id: 1,
    key: "pin_message",
    startContent: <Pin width={19} height={19} />,
    classNames: {
      title: "font-semibold"
    },
    value: "Pin",
    color: "primary"
  },
  {
    id: 2,
    key: "copy_message",
    startContent: <Copy width={19} height={19} />,
    classNames: {
      title: "font-semibold"
    },
    value: "Copy Text",
    color: "primary"
  },
  {
    id: 3,
    key: "forward_message",
    startContent: <Forward width={19} height={19} />,
    classNames: {
      title: "font-semibold"
    },
    value: "Forward",
    color: "primary"
  },
  {
    id: 4,
    key: "delete_message",
    startContent: <Trash width={19} height={19} />,
    classNames: {
      title: "font-semibold"
    },
    value: "Delete",
    color: "danger"
  },
  {
    id: 5,
    key: "select_message",
    startContent: <CircleCheck width={19} height={19} />,
    classNames: {
      title: "font-semibold"
    },
    value: "Select",
    color: "primary"
  }
];
