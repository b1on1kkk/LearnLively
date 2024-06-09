import { ChatSocket } from "../../api/chat-socket/chat-socket";
import {
  ChosenConv,
  ChosenMessage,
  MessageActionKind
} from "../../interfaces/Message/Chats";
import type { User } from "../../interfaces/Registration/Validation";
import { MessageData } from "../../interfaces/api/messageData";

export function submitFormHandler(
  user: User,
  messageText: string,
  chosenConvId: ChosenConv,
  chat_socket: ChatSocket | null,
  chosenMessage: ChosenMessage | null
) {
  switch (chosenMessage?.type) {
    case MessageActionKind.edit_message: {
      const message: MessageData = {
        conv_id: chosenConvId.id,
        message: {
          ...chosenMessage.message_data,
          content: messageText,
          edited: true,
          selected: chosenMessage.message_data.selected
        }
      };

      chat_socket?.changeEditedMessage(message);

      break;
    }

    case MessageActionKind.reply_message: {
      const messageData: MessageData = {
        conv_id: chosenConvId.id,
        message: {
          user_id: user.id,
          conversation_id: chosenConvId.id,
          content: messageText,
          sent_at: new Date().toLocaleTimeString(),
          delivered_at: new Date().toLocaleTimeString(),
          edited: false,
          seen: false,
          users: {
            img_hash_name: user.img_hash_name,
            name: user.name,
            lastname: user.lastname,
            external_status: user.external_status
          },
          messages: {
            content: chosenMessage.message_data.content,
            users: {
              img_hash_name: chosenMessage.message_data.users.img_hash_name,
              name: chosenMessage.message_data.users.name,
              lastname: chosenMessage.message_data.users.lastname,
              external_status: user.external_status
            }
          },
          replies_to: chosenMessage.message_data.id,
          selected: false
        }
      };

      chat_socket?.sendMessage(messageData);

      break;
    }

    // if none of the privious conditions do not worked - user just sending messages
    default: {
      const messageData: MessageData = {
        conv_id: chosenConvId.id,
        message: {
          user_id: user.id,
          conversation_id: chosenConvId.id,
          content: messageText,
          sent_at: new Date().toLocaleTimeString(),
          delivered_at: new Date().toLocaleTimeString(),
          edited: false,
          seen: false,
          users: {
            img_hash_name: user.img_hash_name,
            name: user.name,
            lastname: user.lastname,
            external_status: user.external_status
          },
          messages: null,
          replies_to: null,
          selected: false
        }
      };

      chat_socket?.sendMessage(messageData);

      break;
    }
  }
}
