import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import { AppDispatch } from "../store/store";
import { messagesActions } from "../store/features/messages.slice";

import type { TMessage } from "../interfaces/api/newChat";

const useSelectMessage = (messages: Array<TMessage>) => {
  const dispatch = useDispatch<AppDispatch>();

  const [id, setId] = useState<number | null>(null);

  useEffect(() => {
    if (id) {
      const updatedMessages = messages.map((msg) => {
        if (msg.id === id) return { ...msg, selected: !msg.selected };

        return msg;
      });

      dispatch(messagesActions.messageInit(updatedMessages));
      setId(null);
    }
  }, [id]);

  return { setId };
};

export default useSelectMessage;
