import { useRef, useState } from "react";

import useScrollToBottom from "../../hooks/useScrollToBottom";

import { Button } from "@nextui-org/react";
import { Phone, Send, Paperclip } from "lucide-react";

import { SystemButton } from "../SystemButton";

export const Chat = () => {
  const [message, setMessage] = useState<string>("");
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const fake = new Array(10).fill(0);

  const elemToScrollToButton = useScrollToBottom(fake);

  return (
    <div className="flex h-full p-3 flex-col">
      <header className="px-7 py-3 flex bg-[#00010d] border-slate-900 border-2 rounded-2xl shadow-2xl items-center gap-3 text-slate-400 mb-2">
        <div>
          <div className="w-[40px] h-[40px] bg-gray-400 rounded-full"></div>
        </div>

        <div className="flex-1 flex flex-col">
          <span>
            <h1 className="font-semibold text-sm">Alex Sinyak</h1>
          </span>
          <span className="text-xs opacity-55">offline</span>
        </div>

        <div>
          <SystemButton
            icon={<Phone width={18} height={18} />}
            label="call"
            onClick={() => {}}
          />
        </div>
      </header>

      <main
        className="flex-1 overflow-auto flex flex-col p-5 gap-4"
        ref={elemToScrollToButton}
      >
        <div className="flex h-full items-center justify-center">
          <div className="p-4 flex flex-col text-center gap-2 bg-[#00010d] rounded-2xl border-slate-900 border-2">
            <span className="font-semibold">No messages here yet...</span>
            <span className="text-sm">
              Send a message or tap on the
              <br />
              greeting below.
            </span>

            <Button className="font-semibold bg-gradient-to-r from-green-400 to-blue-500">
              Hey!
            </Button>
          </div>
        </div>

        {/* {fake.map(() => {
          return (
            <>
              <div className="flex gap-3">
                <div>
                  <div className="w-[40px] h-[40px] bg-gray-400 rounded-full"></div>
                </div>
                <div className="max-w-[300px] p-3 rounded-2xl bg-[#00010d] break-all text-slate-400">
                  <p className="text-sm font-semibold mb-3">
                    asddfjkghkdjhgsjghdfkgjhsofuieyhfuyhsdbxcmbvjhsdgfdjgjkshfkhsfasdasd
                  </p>

                  <div className="flex gap-1">
                    <span className="text-[10px] font-semibold">17:50</span>
                    <span className="text-[10px] font-semibold">edited</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 justify-end">
                <div className="max-w-[300px] p-3 rounded-2xl bg-gradient-to-r from-green-400 to-blue-500 break-all text-white">
                  <p className="text-sm font-semibold mb-3">
                    asddfjkghkdjhgsjghdfkgjh
                  </p>

                  <div className="flex gap-1">
                    <span className="text-[10px] font-semibold">17:50</span>
                    <span className="text-[10px] font-semibold">edited</span>
                  </div>
                </div>

                <div>
                  <div className="w-[40px] h-[40px] bg-gray-400 rounded-full"></div>
                </div>
              </div>
            </>
          );
        })} */}
      </main>

      <footer className="p-2 bg-[#00010d] border-slate-900 border-2 rounded-2xl text-slate-400 shadow-2xl mt-2">
        <form
          className="flex"
          onSubmit={(e) => {
            e.preventDefault();
            console.log("worked");
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
    </div>
  );
};
