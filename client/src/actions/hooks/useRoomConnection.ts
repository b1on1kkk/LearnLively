import { useEffect } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../store/store";

const useRoomConnection = () => {
  const { chat_socket, chosenConvId } = useSelector(
    (c: RootState) => c.chatSocket
  );

  useEffect(() => {
    if (chat_socket && chosenConvId) {
      chat_socket.connectToChatRoom(chosenConvId);
    }
    return () => {
      if (chat_socket && chosenConvId) {
        chat_socket.leaveChatRoom(chosenConvId);
      }
    };
  }, [chat_socket, chosenConvId]);
};

export default useRoomConnection;
