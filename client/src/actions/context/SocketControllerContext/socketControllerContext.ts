import { createContext } from "react";

import { SocketControllerContent } from "../../interfaces/context/SocketControllerContent";

export const MySocketControllerContext = createContext<SocketControllerContent>(
  {
    chosenUser: null,
    socketController: null,
    setChosenUser: () => {}
  }
);
