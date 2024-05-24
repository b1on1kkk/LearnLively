import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useRef, useState } from "react";

import { Button } from "@nextui-org/react";
import { SystemButton } from "../SystemButton";
import { MessageAction } from "./MessageAction";
import { Paperclip } from "lucide-react";
import { MessageActionSubmitButton } from "./MessageActionSubmitButton";
import { SelectedFooterMessagesButtons } from "./SelectedFooterMessagesButtons";

import { AppDispatch, RootState } from "../../store/store";
import { submitFormHandler } from "../../utils/Message/submitFormHandler";
import { DispatchActionsHandler } from "../../utils/handlers/dispatchActionsHandler";

import { MessageActionKind } from "../../interfaces/Message/Chats";

export const Footer = ({ onOpen }: { onOpen: () => void }) => {
  const dispatch = useDispatch<AppDispatch>();

  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const [messageText, setMessageText] = useState<string>("");

  const { chat_socket, chosenConvId } = useSelector(
    (c: RootState) => c.chatSocket
  );
  const { user } = useSelector((c: RootState) => c.user);
  const { messages, chosenMessage } = useSelector((m: RootState) => m.messages);

  const dispatchActionsHandler = useMemo(
    () => new DispatchActionsHandler(dispatch),
    []
  );

  useEffect(() => {
    if (chosenMessage) {
      switch (chosenMessage.type) {
        case MessageActionKind.edit_message: {
          setMessageText(chosenMessage.message_data.content);

          break;
        }

        case MessageActionKind.copy_message: {
          navigator.clipboard.writeText(chosenMessage.message_data.content);

          dispatchActionsHandler.messageInitHandler({
            messages: messages,
            chosenMessage: null
          });

          break;
        }

        case MessageActionKind.delete_message: {
          onOpen();
          break;
        }
      }
    }
  }, [chosenMessage]);

  return (
    <footer
      className={`p-2 bg-[#00010d] border-slate-900 border-2 rounded-2xl text-slate-400 shadow-2xl mt-2 flex flex-col gap-2`}
    >
      {chosenMessage &&
      chosenMessage.type === MessageActionKind.select_message ? (
        <SelectedFooterMessagesButtons
          onOpen={onOpen}
          onCloseSelection={() => {
            dispatchActionsHandler.messageInitHandler({
              messages: [
                ...messages.map((message) => ({
                  ...message,
                  selected: false
                }))
              ],
              chosenMessage: null
            });
          }}
        />
      ) : (
        <>
          <MessageAction />
          <form
            className="flex"
            onSubmit={(e) => {
              e.preventDefault();

              if (
                messageText.replace(/\s+/g, "") === "" ||
                !user ||
                !chosenConvId
              ) {
                return;
              }

              submitFormHandler(
                user,
                messageText,
                chosenConvId,
                chat_socket,
                chosenMessage
              );

              setMessageText("");
            }}
          >
            <div>
              <SystemButton
                icon={
                  <>
                    <input type="file" className="hidden" ref={inputFileRef} />
                    <Paperclip width={18} height={18} />
                  </>
                }
                label="file"
                onClick={() => inputFileRef.current?.click()}
              />
            </div>
            <div className="flex-1">
              <input
                type="text"
                id="message"
                placeholder="Write a message..."
                className="w-full h-full bg-transparent outline-none rounded-2xl px-2 placeholder:text-sm font-semibold text-sm"
                autoComplete="off"
                spellCheck="true"
                value={messageText}
                onBlur={() => {
                  if (chosenConvId && chat_socket) {
                    chat_socket.notTyping(chosenConvId.id);
                  }
                }}
                onFocus={() => {
                  if (chosenConvId && user && chat_socket) {
                    chat_socket.isTyping(chosenConvId.id, {
                      id: user.id,
                      name: user.name
                    });
                  }
                }}
                onChange={(e) => setMessageText(e.target.value)}
              />
            </div>
            <div>
              <Button
                className={`p-0 min-w-10 ${
                  messageText
                    ? "bg-indigo-500 text-white"
                    : "bg-[#050615] text-slate-400"
                } border-slate-900 border-2 rounded-2xl`}
                type="submit"
              >
                <MessageActionSubmitButton />
              </Button>
            </div>
          </form>
        </>
      )}
    </footer>
  );
};
