import { useEffect } from "react";
import { useSelector } from "react-redux";
import useMessages from "../../hooks/useMessages";
import useChatContext from "../../hooks/useChatContext";
import useScrollToBottom from "../../hooks/useScrollToBottom";

import { Check, CheckCheck } from "lucide-react";
import { StartChat } from "./StartChat";
import { Image } from "@nextui-org/react";
import { Loading } from "../Loading/Loading";
import { MessageEditions } from "./MessageEditions";

import { RootState } from "../../store/store";

import { toImageLink } from "../../utils/Students/toImageLink";

import {
  MAIN_MESSAGE_FUNCTIONALITY_OTHERS,
  MAIN_MESSAGE_FUNCTIONALITY_SENDER
} from "../../constants/Message/message_functionality";

import type { TMessage } from "../../interfaces/api/newChat";
import { MessagActionKind } from "../../interfaces/Message/Chats";

export const Main = () => {
  const { setChosenMessage } = useChatContext();
  const { chosenConvId } = useSelector((c: RootState) => c.chatSocket);

  const { isLoading, refetch } = useMessages(chosenConvId);

  const { user } = useSelector((u: RootState) => u.user);
  const { messages } = useSelector((m: RootState) => m.messages);

  useEffect(() => {
    refetch();
  }, [chosenConvId]);

  const elemToScrollToButton = useScrollToBottom<Array<TMessage>>(messages);

  return (
    <main
      className="flex-1 overflow-auto flex flex-col p-5 gap-4"
      ref={elemToScrollToButton}
    >
      {isLoading ? (
        <Loading />
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
                        setChosenMessage({
                          type: e.currentTarget.dataset.key as MessagActionKind,
                          message_data: message
                        });
                      }}
                      functionality={MAIN_MESSAGE_FUNCTIONALITY_SENDER}
                    >
                      <div className="flex transition-all duration-200 gap-3">
                        <div className="max-w-[300px] min-w-[150px] px-3 py-2 rounded-2xl bg-gradient-to-r from-green-400 to-blue-500 break-all text-white">
                          <p className="font-semibold mb-1">
                            {message.content}
                          </p>

                          <div className="flex gap-1 justify-end items-center">
                            {/* <span className="text-[10px] font-semibold">
                              edited
                            </span> */}
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

                        <div>
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
                      setChosenMessage({
                        type: e.currentTarget.dataset.key as MessagActionKind,
                        message_data: message
                      });
                    }}
                    functionality={MAIN_MESSAGE_FUNCTIONALITY_OTHERS}
                  >
                    <div className="flex transition-all duration-200 gap-3">
                      <div>
                        <Image
                          width={45}
                          src={toImageLink(message.users.img_hash_name)}
                          className="rounded-full"
                        />
                      </div>
                      <div className="max-w-[300px] min-w-[150px] px-3 py-2 rounded-2xl bg-[#00010d] break-all text-slate-400">
                        <p className="font-semibold mb-3">{message.content}</p>

                        <div className="flex gap-1">
                          <span className="text-[11px] font-semibold">
                            {new Date(message.delivered_at)
                              .toISOString()
                              .slice(11, 16)}
                          </span>
                          {/* <span className="text-[10px] font-semibold">
                            edited
                          </span> */}
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
    </main>
  );
};
