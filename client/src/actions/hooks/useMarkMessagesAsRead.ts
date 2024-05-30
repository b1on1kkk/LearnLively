import { useEffect, useMemo } from "react";

import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const useMarkMessagesAsRead = () => {
  const { user } = useSelector((u: RootState) => u.user);
  const { chat_socket, chosenConvId } = useSelector(
    (c: RootState) => c.chatSocket
  );
  const { messages } = useSelector((m: RootState) => m.messages);

  const unreadedMessages = useMemo(() => {
    if (!messages.length || !user || !chosenConvId) return [];

    return messages
      .filter((message) => message.user_id !== user.id && !message.seen)
      .map((message) => ({
        ...message,
        seen: true
      }));
  }, [messages, user, chosenConvId]);

  useEffect(() => {
    if (unreadedMessages.length > 0 && chosenConvId) {
      chat_socket?.readMessage({
        meta_data: {
          seen_user_id: user!.id,
          conv_id: chosenConvId.id
        },
        message: unreadedMessages
      });
    }
  }, [unreadedMessages]);
};

export default useMarkMessagesAsRead;
