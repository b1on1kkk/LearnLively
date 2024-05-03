import useChatListeners from "../../hooks/useChatListeners";
import useRoomConnection from "../../hooks/useRoomConnection";

import { Main } from "./Main";
import { Header } from "./Header";
import { Footer } from "./Footer";

export const Chat = () => {
  useChatListeners();

  useRoomConnection();

  return (
    <div className="flex h-full p-3 flex-col overflow-hidden">
      <Header />

      <Main />

      <Footer />
    </div>
  );
};
