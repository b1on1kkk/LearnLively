import { createContext } from "react";

import type { ChatContent } from "../../interfaces/Message/Chats";

export const MyChatContext = createContext<ChatContent>({
  chosenMessage: null,
  setChosenMessage: () => {}
});
