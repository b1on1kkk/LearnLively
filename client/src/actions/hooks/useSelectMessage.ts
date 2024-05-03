import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import { AppDispatch } from "../store/store";
import { messagesActions } from "../store/features/messages.slice";

import type { TMessage } from "../interfaces/api/newChat";
import { ChosenMessage } from "../interfaces/Message/Chats";

const useSelectMessage = (
  messages: Array<TMessage>,
  chosenMessage: ChosenMessage | null
) => {
  const dispatch = useDispatch<AppDispatch>();

  const [id, setId] = useState<number | null>(null);

  useEffect(() => {
    if (id) {
      const updatedMessages = messages.map((msg) => {
        if (msg.id === id) return { ...msg, selected: !msg.selected };

        return msg;
      });

      dispatch(
        messagesActions.messageInit({
          messages: updatedMessages,
          chosenMessage: chosenMessage
        })
      );
      setId(null);
    }
  }, [id]);

  return { setId };
};

export default useSelectMessage;
