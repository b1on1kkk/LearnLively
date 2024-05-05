import type { TMessage } from "./newChat";

export interface MessageData {
  uuid: string;
  message: Omit<TMessage, "id">;
}
