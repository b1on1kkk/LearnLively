import { Key } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ChatCard } from "../MessagesComp/ChatCard";
import { WarningEmptyChats } from "../MessagesComp/WarningEmptyChats";

import { AppDispatch, RootState } from "../../store/store";
import { chatSocketAcitons } from "../../store/features/chatSocket.slice";
import { chosenUserChatActions } from "../../store/features/chosenUserChat.slice";

export const ChatsType = ({ type }: { type: Exclude<Key, bigint> }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { chats } = useSelector((c: RootState) => c.chats);
  const { groups } = useSelector((g: RootState) => g.groups);

  switch (type) {
    case "private":
      return (
        <>
          {chats.length > 0 ? (
            <>
              {chats.map((chat) => {
                const { id, conversation_hash } = chat.conversations;

                return (
                  <ChatCard
                    data={chat}
                    key={chat.conversations.id}
                    uuid_code={conversation_hash}
                    onClick={() => {
                      dispatch(
                        chosenUserChatActions.chosenUserInit({
                          chosenGroup: null,
                          chosenUser:
                            chat.conversations.users_conversations[0].users
                        })
                      );

                      dispatch(
                        chatSocketAcitons.chosenConvIdInit({
                          id: id
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
            <>
              {groups.map((group) => {
                const { groups } = group;

                return (
                  <ChatCard
                    data={groups}
                    key={groups.id}
                    uuid_code={groups.conversations.conversation_hash}
                    onClick={() => {
                      dispatch(
                        chosenUserChatActions.chosenUserInit({
                          chosenGroup: groups,
                          chosenUser: null
                        })
                      );

                      dispatch(
                        chatSocketAcitons.chosenConvIdInit({
                          id: groups.conversations.id
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

    default:
      return <></>;
  }
};
