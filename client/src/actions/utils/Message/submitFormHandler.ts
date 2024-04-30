import { ChatSocket } from "../../api/chat-socket/chat-socket";
import {
  ChosenConv,
  ChosenMessage,
  MessageActionKind
} from "../../interfaces/Message/Chats";
import { User } from "../../interfaces/Registration/Validation";

export function submitFormHandler(
  user: User,
  messageText: string,
  chosenConvId: ChosenConv,
  chat_socket: ChatSocket | null,
  chosenMessage: ChosenMessage | null
) {
  switch (chosenMessage?.type) {
    case MessageActionKind.edit_message: {
      const message = {
        uuid: chosenConvId.uuid,
        message: {
          ...chosenMessage.message_data,
          content: messageText,
          edited: true
        }
      };

      chat_socket?.changeEditedMessage(message);

      break;
    }

    // if none of the privious conditions do not worked - user just sending messages
    default: {
      const messageData = {
        uuid: chosenConvId.uuid,
        message: {
          user_id: user.id,
          conversation_id: chosenConvId.id,
          content: messageText,
          sent_at: new Date(),
          delivered_at: new Date(),
          edited: false,
          users: {
            img_hash_name: user.img_hash_name,
            name: user.name,
            lastname: user.lastname
          },
          seen_messages: []
        }
      };

      chat_socket?.sendMessage(messageData);
      break;
    }
  }
}
