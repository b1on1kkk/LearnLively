import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../store/store";
import { messagesActions } from "../store/features/messages.slice";
import { chatSocketAcitons } from "../store/features/chatSocket.slice";
import { chosenUserChatActions } from "../store/features/chosenUserChat.slice";

const useGroupChangeListener = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { user } = useSelector((u: RootState) => u.user);
  const { service_socket } = useSelector((s: RootState) => s.serviceSocket);

  // listener
  useEffect(() => {
    // set up listener that get data about all created groups
    if (service_socket && user) service_socket.getGroups(user.id);

    // remove all previous data if user leave "message" page after some action
    return () => {
      dispatch(chatSocketAcitons.chosenConvIdInit(null));
      dispatch(
        chosenUserChatActions.chosenUserInit({
          chosenGroup: null,
          chosenUser: null
        })
      );
      dispatch(
        messagesActions.messageInit({ chosenMessage: null, messages: [] })
      );
    };
  }, [service_socket, user]);
};

export default useGroupChangeListener;
