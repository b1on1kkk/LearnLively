import { useSelector } from "react-redux";
import useScrollToBottom from "../../hooks/useScrollToBottom";

import { Button } from "@nextui-org/react";
import { RootState } from "../../store/store";

export const Main = () => {
  const fake = new Array(10).fill(0);

  const elemToScrollToButton = useScrollToBottom(fake);

  const { user } = useSelector((u: RootState) => u.user);
  const { chat_socket } = useSelector((c: RootState) => c.chatSocket);
  const { chosenUser } = useSelector((cu: RootState) => cu.chosenUserChat);

  return (
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

          <Button
            className="font-semibold bg-gradient-to-r from-green-400 to-blue-500"
            onClick={() => {
              if (user) {
                chat_socket?.startChat(
                  [chosenUser!.id, user.id],
                  "private",
                  "Hey!"
                );
              }
            }}
          >
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
  );
};
