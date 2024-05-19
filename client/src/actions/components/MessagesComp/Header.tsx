import { Info, Phone } from "lucide-react";
import { useSelector } from "react-redux";

import { RootState } from "../../store/store";

import { SystemButton } from "../SystemButton";

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
          <div className="flex-1 flex flex-col">
            <span>
              <h1 className="font-semibold">{chosenGroup?.group_name}</h1>
            </span>
            <span className="text-sm opacity-55">4 subscribers</span>
          </div>

          <div>
            <SystemButton
              icon={<Info width={18} height={18} />}
              label="info"
              onClick={() => {}}
            />
          </div>
        </>
      )}
    </header>
  );
};
