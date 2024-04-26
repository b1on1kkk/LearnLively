import { Phone } from "lucide-react";
import { useSelector } from "react-redux";

import { RootState } from "../../store/store";

import { SystemButton } from "../SystemButton";

import { Image } from "@nextui-org/react";

import { toImageLink } from "../../utils/Students/toImageLink";

export const Header = () => {
  const { chosenUser } = useSelector((cu: RootState) => cu.chosenUserChat);

  return (
    <header className="px-7 py-3 flex bg-[#00010d] border-slate-900 border-2 rounded-2xl shadow-2xl items-center gap-3 text-slate-400 mb-2">
      {chosenUser ? (
        <>
          <div>
            <Image width={35} src={toImageLink(chosenUser.img_hash_name)} />
          </div>

          <div className="flex-1 flex flex-col">
            <span>
              <h1 className="font-semibold text-sm">
                {chosenUser.name} {chosenUser.lastname}
              </h1>
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
        </>
      ) : (
        <></>
      )}
    </header>
  );
};
