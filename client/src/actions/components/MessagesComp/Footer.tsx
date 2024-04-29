import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import useChatContext from "../../hooks/useChatContext";

import { Button } from "@nextui-org/react";
import { Paperclip, Send } from "lucide-react";
import { SystemButton } from "../SystemButton";
import { MessageAction } from "./MessageAction";

import { RootState } from "../../store/store";

export const Footer = () => {
  const [message, setMessage] = useState<string>("");
  const { chosenMessage } = useChatContext();
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const { chat_socket, chosenConvId } = useSelector(
    (c: RootState) => c.chatSocket
  );
  const { user } = useSelector((c: RootState) => c.user);

  return (
    <footer className="p-2 bg-[#00010d] border-slate-900 border-2 rounded-2xl text-slate-400 shadow-2xl mt-2 flex flex-col gap-2">
      <MessageAction />
      <form
        className="flex"
        onSubmit={(e) => {
          e.preventDefault();
          if (
            user &&
            chosenConvId &&
            message.replace(/\s+/g, "") !== "" &&
            !chosenMessage
          ) {
            chat_socket?.sendMessage(user.id, message, chosenConvId, user);

            setMessage("");
          } else if (chosenMessage && message.replace(/\s+/g, "") !== "") {
            console.log(chosenMessage.message_data.id);
          }
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
          <label htmlFor=""></label>
        </div>
        <div className="flex-1">
          <input
            type="text"
            id="message"
            placeholder="Write a message..."
            className="w-full h-full bg-transparent outline-none rounded-2xl px-2 placeholder:text-sm font-semibold text-sm"
            autoComplete="off"
            spellCheck="true"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <div>
          <Button
            className={`p-0 min-w-10 ${
              message
                ? "bg-gradient-to-r from-green-400 to-blue-500 text-white"
                : "bg-[#050615] text-slate-400"
            } border-slate-900 border-2 rounded-2xl`}
            type="submit"
          >
            <Send width={18} height={18} />
          </Button>
        </div>
      </form>
    </footer>
  );
};