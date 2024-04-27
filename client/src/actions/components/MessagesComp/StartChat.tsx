import { Button } from "@nextui-org/react";

import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export const StartChat = () => {
  const { user } = useSelector((u: RootState) => u.user);
  const { chat_socket } = useSelector((c: RootState) => c.chatSocket);
  const { chosenUser } = useSelector((cu: RootState) => cu.chosenUserChat);

  return (
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
                [user.id, chosenUser!.id],
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
  );
};
