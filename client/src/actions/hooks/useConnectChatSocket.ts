import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { User } from "../interfaces/Registration/Validation";
import { ChatSocket } from "../api/chat-socket/chat-socket";
import { socketAcitons } from "../store/features/socket.slice";
import { useEffect } from "react";

const useConnectChatSocket = (url: string, user: User | null) => {
  const dispatch = useDispatch<AppDispatch>();
  const { chat_socket } = useSelector((s: RootState) => s.socket);

  const connectSocket = () => {
    if (!chat_socket && user) {
      dispatch(socketAcitons.chatSocketInit(new ChatSocket(url)));
    }
  };

  useEffect(() => {
    connectSocket();
  }, []);

  return { chat_socket };
};

export default useConnectChatSocket;
