import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import useMessages from "../../hooks/useMessages";
import useSelectMessage from "../../hooks/useSelectMessage";
import useScrollToBottom from "../../hooks/useScrollToBottom";

import { Check, CheckCheck } from "lucide-react";
import { Checkbox, CheckboxGroup, Image } from "@nextui-org/react";

import { StartChat } from "./StartChat";
import { UserMessage } from "./UserMessage";
import { Loading } from "../Loading/Loading";
import { MessageEditions } from "./MessageEditions";
import { CompanionMessage } from "./CompanionMessage";

import { AppDispatch, RootState } from "../../store/store";

import {
  MAIN_MESSAGE_FUNCTIONALITY_OTHERS,
  MAIN_MESSAGE_FUNCTIONALITY_SENDER
} from "../../constants/Message/message_functionality";

import { toImageLink } from "../../utils/Students/toImageLink";
import { DispatchActionsHandler } from "../../utils/handlers/dispatchActionsHandler";

import type { TMessage } from "../../interfaces/api/newChat";
import { MessageActionKind } from "../../interfaces/Message/Chats";
// import { useMutation } from "@tanstack/react-query";
// import axios, { AxiosError } from "axios";
// import { QUERY_ROOT } from "../../constants/Query/query";

// const useAddUserSeenMessage = () => {
//   return useMutation<
//     { message: string; code: number },
//     AxiosError,
//     { messages: Array<TMessage>; user_id: number }
//   >({
//     mutationFn: (message: { messages: Array<TMessage>; user_id: number }) =>
//       axios
//         .post(
//           `${QUERY_ROOT}api/user_seen_message`,
//           {
//             messages: message.messages,
//             user_id: message.user_id
//           },
//           { withCredentials: true }
//         )
//         .then((res) => {
//           return res.data;
//         })
//   });
// };

export const Main = () => {
  const dispatch = useDispatch<AppDispatch>();

  // const userSeenMessage = useAddUserSeenMessage();

  const { user } = useSelector((u: RootState) => u.user);
  const { chat_socket, chosenConvId } = useSelector(
    (c: RootState) => c.chatSocket
  );
  const { messages, chosenMessage } = useSelector((m: RootState) => m.messages);

  const { setId } = useSelectMessage(messages, chosenMessage);
  const { data, isLoading, refetch } = useMessages(chosenConvId);

  const dispatchActionsHandler = useMemo(
    () => new DispatchActionsHandler(dispatch),
    []
  );
  const elemToScrollToButton = useScrollToBottom<Array<TMessage> | undefined>(
    data
  );

  useEffect(() => {
    if (chosenConvId) refetch();
  }, [chosenConvId]);

  // not optimize solution, think also about group chat
  useEffect(() => {
    if (!messages.length || !user || !chosenConvId) return;

    const unreadedMessages = [];

    for (let i = 0; i < messages.length; i++) {
      if (messages[i].user_id !== user.id && !messages[i].seen) {
        unreadedMessages.push({
          ...messages[i],
          seen: true
        });
      }
    }

    if (unreadedMessages.length > 0) {
      chat_socket?.readMessage({
        meta_data: {
          seen_user_id: user.id,
          uuid: chosenConvId.uuid
        },
        message: unreadedMessages
      });
    }
  }, [messages, user, chosenConvId]);

  console.log(messages);

  return (
    <main
      className="flex-1 overflow-auto flex flex-col p-5 gap-3"
      ref={elemToScrollToButton}
    >
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {chosenMessage &&
          chosenMessage.type === MessageActionKind.select_message ? (
            <CheckboxGroup classNames={{ base: "flex-1", wrapper: "gap-3" }}>
              <>
                {messages.map((message, idx) => {
                  if (message.user_id === user?.id) {
                    return (
                      <Checkbox
                        key={idx}
                        classNames={{
                          base: "flex m-0 p-0 max-w-none justify-end gap-3 rounded-none",
                          label: "flex gap-3",
                          wrapper: "order-2 mr-0"
                        }}
                        color="primary"
                        value={`message_${message.id}`}
                        onChange={() => setId(message.id)}
                      >
                        <UserMessage message={message} />
                      </Checkbox>
                    );
                  }
                  return (
                    <Checkbox
                      key={idx}
                      classNames={{
                        base: "flex m-0 p-0 max-w-none",
                        label: "flex gap-3",
                        wrapper: "mr-0"
                      }}
                      color="primary"
                      value={`message_${message.id}`}
                      onChange={() => setId(message.id)}
                    >
                      <CompanionMessage message={message} />
                    </Checkbox>
                  );
                })}
              </>
            </CheckboxGroup>
          ) : (
            <>
              {messages.length > 0 ? (
                <>
                  {messages.map((message, idx) => {
                    if (message.user_id === user?.id) {
                      return (
                        <MessageEditions
                          key={idx}
                          id={idx}
                          message={message}
                          wrapper="flex justify-end"
                          onClickAction={(e) => {
                            dispatchActionsHandler.messageActionsHandler(
                              e,
                              messages,
                              message
                            );
                          }}
                          functionality={MAIN_MESSAGE_FUNCTIONALITY_SENDER}
                        >
                          <div className="flex gap-3 min-h-[64px]">
                            <div className="max-w-[300px] min-w-[150px] px-3 py-2 rounded-2xl bg-indigo-500 break-all text-white flex flex-col">
                              {message.replies_to && (
                                <div className="flex flex-col p-1 border-l-3 bg-white/20 rounded-r-lg pl-2">
                                  <h1 className="text-sm font-semibold">
                                    {message.messages?.users.name}
                                  </h1>
                                  <span className="text-sm truncate">
                                    {message.messages?.content}
                                  </span>
                                </div>
                              )}

                              <p className="font-semibold flex-1">
                                {message.content}
                              </p>

                              <div className="flex gap-1 justify-end items-center">
                                {message.edited && (
                                  <span className="text-[10px] font-semibold">
                                    edited
                                  </span>
                                )}
                                <span className="text-[11px] font-semibold">
                                  {message.delivered_at.slice(0, -3)}
                                </span>
                                <span>
                                  {message.seen ? (
                                    <CheckCheck width={13} height={13} />
                                  ) : (
                                    <Check width={13} height={13} />
                                  )}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-end">
                              <Image
                                width={45}
                                src={toImageLink(message.users.img_hash_name)}
                                className="rounded-full"
                              />
                            </div>
                          </div>
                        </MessageEditions>
                      );
                    }
                    return (
                      <MessageEditions
                        key={idx}
                        id={idx}
                        wrapper="flex"
                        message={message}
                        onClickAction={(e) => {
                          dispatchActionsHandler.messageActionsHandler(
                            e,
                            messages,
                            message
                          );
                        }}
                        functionality={MAIN_MESSAGE_FUNCTIONALITY_OTHERS}
                      >
                        <div className="flex gap-3 min-h-[64px]">
                          <div className="flex items-end">
                            <Image
                              width={45}
                              src={toImageLink(message.users.img_hash_name)}
                              className="rounded-full"
                            />
                          </div>
                          <div className="max-w-[300px] min-w-[150px] px-3 py-2 rounded-2xl bg-[#00010d] break-all text-slate-400 flex flex-col">
                            {message.replies_to && (
                              <div className="flex flex-col p-1 border-l-3 bg-white/20 rounded-r-lg pl-2">
                                <h1 className="text-sm font-semibold">
                                  {message.messages?.users.name}
                                </h1>
                                <span className="text-sm truncate">
                                  {message.messages?.content}
                                </span>
                              </div>
                            )}

                            <p className="font-semibold flex-1">
                              {message.content}
                            </p>

                            <div className="flex gap-1 justify-end">
                              <span className="text-[11px] font-semibold">
                                {message.delivered_at.slice(0, -3)}
                              </span>
                              {message.edited && (
                                <span className="text-[10px] font-semibold">
                                  edited
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </MessageEditions>
                    );
                  })}
                </>
              ) : (
                <StartChat />
              )}
            </>
          )}
        </>
      )}
    </main>
  );
};
