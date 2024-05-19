import type { TMessage } from "./newChat";

export type MessageData = Omit<TMessage, "id">;
