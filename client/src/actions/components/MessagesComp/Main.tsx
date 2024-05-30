import { useMemo } from "react";
import useMessages from "../../hooks/useMessages";
import { useDispatch, useSelector } from "react-redux";
import useSelectMessage from "../../hooks/useSelectMessage";
import useScrollToBottom from "../../hooks/useScrollToBottom";
import useMarkMessagesAsRead from "../../hooks/useMarkMessagesAsRead";

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

export const Main = () => {
  // hook to make messages readed
  useMarkMessagesAsRead();

  const dispatch = useDispatch<AppDispatch>();

  const { user } = useSelector((u: RootState) => u.user);
  const { chosenConvId } = useSelector((c: RootState) => c.chatSocket);
  const { messages, chosenMessage } = useSelector((m: RootState) => m.messages);

  const { setId } = useSelectMessage(messages, chosenMessage);
  const { isLoading } = useMessages(chosenConvId);

  const dispatchActionsHandler = useMemo(
    () => new DispatchActionsHandler(dispatch),
    []
  );
  const elemToScrollToButton = useScrollToBottom<Array<TMessage>>(messages);

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
                              {message.edited && (
                                <span className="text-[10px] font-semibold">
                                  edited
                                </span>
                              )}
                              <span className="text-[11px] font-semibold">
                                {message.delivered_at.slice(0, -3)}
                              </span>
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
