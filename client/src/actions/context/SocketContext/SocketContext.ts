import { createContext } from "react";
import type { SocketContent } from "../../interfaces/MainApp/socket";

export const MySocketContext = createContext<SocketContent>({
  socket: null
});
