import { useEffect, useState } from "react";

import type { TMessage } from "../interfaces/api/newChat";

const useSelectedMessagesCounter = (messages: Array<TMessage>) => {
  const [selectedMessages, setSelectedMessages] = useState<number>(0);

  useEffect(() => {
    if (messages.length > 0) {
      let counter = 0;

      messages.forEach((message) => {
        if (message.selected) counter++;
      });

      setSelectedMessages(counter);
    }
  }, [messages]);

  return { selectedMessages };
};

export default useSelectedMessagesCounter;
