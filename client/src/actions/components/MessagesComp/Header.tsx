import { Info, Phone } from "lucide-react";
import { useSelector } from "react-redux";

import { Tooltip } from "@nextui-org/react";
import { MembersList } from "./MembersList";
import { SystemButton } from "../SystemButton";

import { RootState } from "../../store/store";

export const Header = () => {
  const { chosenUser, chosenGroup } = useSelector(
    (cu: RootState) => cu.chosenUserChat
  );

  return (
    <header className="px-5 py-3 flex bg-[#00010d] border-slate-900 border-2 rounded-2xl shadow-2xl items-center gap-3 text-slate-400 mb-2">
      {chosenUser ? (
        <>
          <div className="flex-1 flex flex-col">
            <span>
              <h1 className="font-semibold">
                {chosenUser.name} {chosenUser.lastname}
              </h1>
            </span>
            <span className="text-sm opacity-55">offline</span>
          </div>

          <div>
            <SystemButton
              icon={<Phone width={18} height={18} />}
              label="call"
              onClick={() => {}}
            />
          </div>
        </>
      ) : (
        <>
          {chosenGroup && (
            <>
              <div className="flex-1 flex flex-col">
                <span>
                  <h1 className="font-semibold">{chosenGroup.group_name}</h1>
                </span>
                <span className="text-sm opacity-55">
                  {chosenGroup.group_users.length} members
                </span>
              </div>

              <div>
                <Tooltip
                  delay={0}
                  closeDelay={0}
                  content={<MembersList chosenGroup={chosenGroup} />}
                  placement="bottom"
                  className="p-2"
                >
                  <Info
                    width={20}
                    height={20}
                    className="text-slate-400 hover:text-white transition-colors duration-200"
                  />
                </Tooltip>
              </div>
            </>
          )}
        </>
      )}
    </header>
  );
};
