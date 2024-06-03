import { useEffect } from "react";

import { useSelector } from "react-redux";

import { RootState } from "../store/store";

const useGetOnlineUsers = () => {
  const { chat_socket } = useSelector((s: RootState) => s.chatSocket);

  useEffect(() => {
    if (chat_socket) chat_socket.getOnlineUsers();
  }, [chat_socket]);
};

export default useGetOnlineUsers;
