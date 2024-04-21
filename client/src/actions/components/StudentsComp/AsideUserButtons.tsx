import { Link, NavLink } from "react-router-dom";
import { Button, Divider, Tooltip } from "@nextui-org/react";
import {
  MessageSquareMore,
  PhoneOutgoing,
  MessageSquareOff,
  PhoneOff
} from "lucide-react";

import useStudentsContext from "../../hooks/useStudentsContext";

import type { TAsideUserButtons } from "../../interfaces/Students/Aside";

export const AsideUserButtons = ({
  onClickCall,
  onClickChat
}: TAsideUserButtons) => {
  const { chosenUser } = useStudentsContext();

  return (
    <div className="flex gap-3 p-5 items-center">
      {chosenUser && (
        <>
          {(chosenUser.friends_friends_friend_idTousers.length > 0 &&
            chosenUser.friends_friends_friend_idTousers[0].status ===
              "accepted") ||
          (chosenUser.friends_friends_user_idTousers.length > 0 &&
            chosenUser.friends_friends_user_idTousers[0].status ===
              "accepted") ? (
            <>
              <NavLink to={`/message/:${chosenUser.id}`}>
                <Button
                  startContent={<MessageSquareMore width={18} height={18} />}
                  className="bg-transparent text-xs font-semibold flex-1 hover:bg-gray-600 text-slate-600 hover:text-white"
                  onClick={onClickChat}
                >
                  Chat
                </Button>
              </NavLink>

              <Divider orientation="vertical" className="h-5" />
              <Button
                startContent={<PhoneOutgoing width={18} height={18} />}
                className="bg-transparent text-xs font-semibold flex-1 hover:bg-gray-600 text-slate-600 hover:text-white"
                onClick={onClickCall}
              >
                Call
              </Button>
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
