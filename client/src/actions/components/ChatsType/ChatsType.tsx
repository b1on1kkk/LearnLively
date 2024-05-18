import { Key } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { ChatCard } from "../MessagesComp/ChatCard";
import { chosenUserChatActions } from "../../store/features/chosenUserChat.slice";
import { chatSocketAcitons } from "../../store/features/chatSocket.slice";
import { WarningEmptyChats } from "../MessagesComp/WarningEmptyChats";

export const ChatsType = ({ type }: { type: Exclude<Key, bigint> }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { chats } = useSelector((c: RootState) => c.chats);
  const { groups } = useSelector((c: RootState) => c.groups);

  switch (type) {
    case "private":
      return (
        <>
          {chats.length > 0 ? (
            <>
              {chats.map((conv) => {
                const user = conv.conversations.users_conversations[0].users;

                return (
                  <ChatCard
                    key={user.id}
                    users={user}
                    onClick={() => {
                      dispatch(chosenUserChatActions.chosenUserInit(user));

                      dispatch(
                        chatSocketAcitons.chosenConvIdInit({
                          id: conv.conversations.id,
                          uuid: conv.conversations.group_uuid
                        })
                      );
                    }}
                  />
                );
              })}
            </>
          ) : (
            <WarningEmptyChats type={type} />
          )}
        </>
      );

    case "group":
      return (
        <>
          {groups.length > 0 ? (
            <>{/* group ui in future */}</>
          ) : (
            <WarningEmptyChats type={type} />
          )}
        </>
      );

    default:
      return <></>;
  }
};
