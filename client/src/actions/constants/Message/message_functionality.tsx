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
      title: "font-semibold",
      base: "data-[hover=true]:bg-indigo-500"
    },
    value: "Reply"
  },
  {
    id: 1,
    key: "edit_message",
    startContent: <Pencil width={19} height={19} />,
    classNames: {
      title: "font-semibold",
      base: "data-[hover=true]:bg-indigo-500"
    },
    value: "Edit"
  },
  {
    id: 2,
    key: "pin_message",
    startContent: <Pin width={19} height={19} />,
    classNames: {
      title: "font-semibold ",
      base: "data-[hover=true]:bg-indigo-500"
    },
    value: "Pin"
  },
  {
    id: 3,
    key: "copy_message",
    startContent: <Copy width={19} height={19} />,
    classNames: {
      title: "font-semibold",
      base: "data-[hover=true]:bg-indigo-500"
    },
    value: "Copy Text"
  },
  {
    id: 4,
    key: "forward_message",
    startContent: <Forward width={19} height={19} />,
    classNames: {
      title: "font-semibold",
      base: "data-[hover=true]:bg-indigo-500"
    },
    value: "Forward"
  },
  {
    id: 5,
    key: "delete_message",
    startContent: <Trash width={19} height={19} />,
    classNames: {
      title: "font-semibold",
      base: "data-[hover=true]:bg-indigo-500"
    },
    value: "Delete",
    color: "danger"
  },
  {
    id: 6,
    key: "select_message",
    startContent: <CircleCheck width={19} height={19} />,
    classNames: {
      title: "font-semibold",
      base: "data-[hover=true]:bg-indigo-500"
    },
    value: "Select"
  }
];

export const MAIN_MESSAGE_FUNCTIONALITY_OTHERS: Array<MainMessageFunc> = [
  {
    id: 0,
    key: "reply_message",
    startContent: <MessageSquareReply width={19} height={19} />,
    classNames: {
      title: "font-semibold",
      base: "data-[hover=true]:bg-indigo-500"
    },
    value: "Reply"
  },
  {
    id: 1,
    key: "pin_message",
    startContent: <Pin width={19} height={19} />,
    classNames: {
      title: "font-semibold",
      base: "data-[hover=true]:bg-indigo-500"
    },
    value: "Pin"
  },
  {
    id: 2,
    key: "copy_message",
    startContent: <Copy width={19} height={19} />,
    classNames: {
      title: "font-semibold",
      base: "data-[hover=true]:bg-indigo-500"
    },
    value: "Copy Text"
  },
  {
    id: 3,
    key: "forward_message",
    startContent: <Forward width={19} height={19} />,
    classNames: {
      title: "font-semibold",
      base: "data-[hover=true]:bg-indigo-500"
    },
    value: "Forward"
  },
  {
    id: 4,
    key: "delete_message",
    startContent: <Trash width={19} height={19} />,
    classNames: {
      title: "font-semibold",
      base: "data-[hover=true]:bg-indigo-500"
    },
    value: "Delete",
    color: "danger"
  },
  {
    id: 4,
    key: "select_message",
    startContent: <CircleCheck width={19} height={19} />,
    classNames: {
      title: "font-semibold",
      base: "data-[hover=true]:bg-indigo-500"
    },
    value: "Select"
  }
];
