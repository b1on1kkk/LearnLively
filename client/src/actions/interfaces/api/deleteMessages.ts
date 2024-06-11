import { TMessage } from "./newChat";

export interface TDeleteMessages {
  conv_id: number;
  user_id: number;
  message: Array<TMessage>;
}
