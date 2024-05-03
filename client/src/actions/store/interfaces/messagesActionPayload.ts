import type { TMessage } from "../../interfaces/api/newChat";
import type { ChosenMessage } from "../../interfaces/Message/Chats";

export interface ActionPayload {
  messages: Array<TMessage>;
  chosenMessage: ChosenMessage | null;
}
