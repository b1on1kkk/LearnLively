import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Divider, Tooltip } from "@nextui-org/react";
import {
  MessageSquareMore,
  PhoneOutgoing,
  MessageSquareOff,
  PhoneOff
} from "lucide-react";

import { AppDispatch, RootState } from "../../store/store";
import { chatSocketAcitons } from "../../store/features/chatSocket.slice";

export const AsideUserButtons = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { students } = useSelector((u: RootState) => u.students);
  const { chosenUser } = useSelector((cu: RootState) => cu.chosenUserChat);

  return (
    <div className="flex gap-3 p-5 justify-center items-center">
      {chosenUser && students && (
        <>
          {(chosenUser.friends_friends_friend_idTousers.length > 0 &&
            chosenUser.friends_friends_friend_idTousers[0].status ===
              "accepted") ||
          (chosenUser.friends_friends_user_idTousers.length > 0 &&
            chosenUser.friends_friends_user_idTousers[0].status ===
              "accepted") ? (
            <>
              <Link
                to={`/message/${chosenUser.users_conversations[0].conversations.conversation_hash}`}
                className="flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-white hover:bg-indigo-500 flex-1 py-[11px] rounded-xl transition-colors duration-200 justify-center"
                onClick={() => {
                  dispatch(
                    chatSocketAcitons.chosenConvIdInit({
                      id: chosenUser.users_conversations[0].conversation_id
                    })
                  );
                }}
              >
                <div>
                  <MessageSquareMore width={18} height={18} />
                </div>
                <span>Chat</span>
              </Link>

              <Divider orientation="vertical" className="h-5" />

              <Link
                to={`#`}
                className="flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-white hover:bg-indigo-500 flex-1 py-[11px] rounded-xl transition-colors duration-200 justify-center"
              >
                <div>
                  <PhoneOutgoing width={18} height={18} />
                </div>
                <span>Call</span>
              </Link>
            </>
          ) : (
            <Tooltip
              delay={0}
              closeDelay={0}
              content="To use this functionality, the user must be your friend!"
              className="bg-red-500 font-semibold"
            >
              <Button className="w-full flex bg-transparent gap-7">
                <div className="text-slate-600 text-xs font-semibold flex gap-2 flex-1 justify-center items-center">
                  <div>
                    <MessageSquareOff width={18} height={18} />
                  </div>
                  <span>Chat</span>
                </div>
                <Divider orientation="vertical" className="h-5" />
                <div className="text-slate-600 text-xs font-semibold flex gap-2 flex-1 justify-center items-center">
                  <div>
                    <PhoneOff width={18} height={18} />
                  </div>
                  <span>Call</span>
                </div>
              </Button>
            </Tooltip>
          )}
        </>
      )}
    </div>
  );
};
