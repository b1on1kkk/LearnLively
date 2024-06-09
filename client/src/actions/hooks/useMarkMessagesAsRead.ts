import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../store/store";

import type { TMessage } from "../interfaces/api/newChat";

const useMarkMessagesAsRead = (message: TMessage) => {
  const messageRef = useRef(null);

  const { chat_socket, chosenConvId } = useSelector(
    (c: RootState) => c.chatSocket
  );

  const { user } = useSelector((u: RootState) => u.user);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (
            entry.isIntersecting &&
            message.user_id !== user?.id &&
            !message.seen &&
            chosenConvId &&
            chat_socket
          ) {
            chat_socket.readMessage({
              meta_data: {
                seen_user_id: user!.id,
                conv_id: chosenConvId.id
              },
              message: message
            });

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (messageRef.current) observer.observe(messageRef.current);

    return () => {
      if (messageRef.current) observer.unobserve(messageRef.current);
    };
  }, [message.id, chat_socket, chosenConvId]);

  return messageRef;
};

export default useMarkMessagesAsRead;
