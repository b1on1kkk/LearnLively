import type { TMessage } from "./newChat";

export interface MessageData {
  conv_id: number;
  message: Omit<TMessage, "id">;
}
