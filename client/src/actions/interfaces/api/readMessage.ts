import type { TMessage } from "./newChat";

export interface TReadMessage {
  meta_data: {
    seen_user_id: number;
    conv_id: number;
  };
  message: Array<TMessage>;
}
