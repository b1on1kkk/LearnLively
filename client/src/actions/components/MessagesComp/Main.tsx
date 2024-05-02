import { useEffect } from "react";
import { useSelector } from "react-redux";
import useMessages from "../../hooks/useMessages";
import useChatContext from "../../hooks/useChatContext";
import useSelectMessage from "../../hooks/useSelectMessage";
import useScrollToBottom from "../../hooks/useScrollToBottom";

import { Check, CheckCheck } from "lucide-react";
import { Checkbox, CheckboxGroup, Image } from "@nextui-org/react";

import { StartChat } from "./StartChat";
import { UserMessage } from "./UserMessage";
import { Loading } from "../Loading/Loading";
import { MessageEditions } from "./MessageEditions";
import { CompanionMessage } from "./CompanionMessage";

import { RootState } from "../../store/store";

import {
  MAIN_MESSAGE_FUNCTIONALITY_OTHERS,
  MAIN_MESSAGE_FUNCTIONALITY_SENDER
} from "../../constants/Message/message_functionality";

import { toImageLink } from "../../utils/Students/toImageLink";

import type { TMessage } from "../../interfaces/api/newChat";
import { MessageActionKind } from "../../interfaces/Message/Chats";

export const Main = () => {
  const { user } = useSelector((u: RootState) => u.user);
  const { messages } = useSelector((m: RootState) => m.messages);
  const { chosenConvId } = useSelector((c: RootState) => c.chatSocket);

  const { chosenMessage, setChosenMessage } = useChatContext();
  const { setId } = useSelectMessage(messages);
  const { data, isLoading, refetch } = useMessages(chosenConvId);

  useEffect(() => {
    if (chosenConvId) refetch();
  }, [chosenConvId]);

  const elemToScrollToButton = useScrollToBottom<Array<TMessage> | undefined>(
    data
  );

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
            <CheckboxGroup classNames={{ base: "flex-1" }}>
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
                          wrapper="flex justify-end"
                          seenMessages={message.seen_messages}
                          onClickAction={(e) => {
                            const action = e.currentTarget.dataset
                              .key as MessageActionKind;

                            setChosenMessage({
                              type: action,
                              message_data: message
                            });
                          }}
                          functionality={MAIN_MESSAGE_FUNCTIONALITY_SENDER}
                        >
                          <div className="flex transition-all duration-200 gap-3">
                            <div className="max-w-[300px] min-w-[150px] px-3 py-2 rounded-2xl bg-indigo-500 break-all text-white">
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

                              <p className="font-semibold">{message.content}</p>

                              <div className="flex gap-1 justify-end items-center">
                                {message.edited && (
                                  <span className="text-[10px] font-semibold">
                                    edited
                                  </span>
                                )}
                                <span className="text-[11px] font-semibold">
                                  {new Date(message.delivered_at)
                                    .toISOString()
                                    .slice(11, 16)}
                                </span>
                                <span>
                                  {message.seen_messages.length > 0 ? (
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
                        wrapper="flex"
                        onClickAction={(e) => {
                          const action = e.currentTarget.dataset
                            .key as MessageActionKind;

                          setChosenMessage({
                            type: action,
                            message_data: message
                          });
                        }}
                        functionality={MAIN_MESSAGE_FUNCTIONALITY_OTHERS}
                      >
                        <div className="flex transition-all duration-200 gap-3">
                          <div className="flex items-end">
                            <Image
                              width={45}
                              src={toImageLink(message.users.img_hash_name)}
                              className="rounded-full"
                            />
                          </div>
                          <div className="max-w-[300px] min-w-[150px] px-3 py-2 rounded-2xl bg-[#00010d] break-all text-slate-400">
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

                            <p className="font-semibold">{message.content}</p>

                            <div className="flex gap-1 justify-end">
                              <span className="text-[11px] font-semibold">
                                {new Date(message.delivered_at)
                                  .toISOString()
                                  .slice(11, 16)}
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
