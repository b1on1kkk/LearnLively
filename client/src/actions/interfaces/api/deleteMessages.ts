import { TMessage } from "./newChat";

export interface TDeleteMessages {
  meta_data: {
    uuid: string;
    conversation_id: number;
  };
  message: Array<TMessage>;
}
