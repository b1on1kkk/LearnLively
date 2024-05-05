import type { TMessage } from "./newChat";

export interface TReadMessage {
  meta_data: {
    seen_user_id: number;
    uuid: string;
  };
  message: Array<TMessage>;
}
