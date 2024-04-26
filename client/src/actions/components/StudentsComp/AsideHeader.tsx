import { Image } from "@nextui-org/react";

import { useSelector } from "react-redux";

import { RootState } from "../../store/store";
import { toImageLink } from "../../utils/Students/toImageLink";

export const AsideHeader = () => {
  const { chosenUser } = useSelector((cu: RootState) => cu.chosenUserChat);

  return (
    <div>
      <Image
        isZoomed
        removeWrapper={false}
        src={toImageLink(chosenUser!.img_hash_name)}
        alt="student avatar"
      ></Image>
      <div className="bg-[#050615] backdrop-opacity-25 block rounded-lg p-3 -mt-[130px] z-10 relative m-4 bg-opacity-90 border-2 border-slate-900">
        <div className="text-2xl text-center font-bold mb-3">
          <span>
            <h1>
              {chosenUser!.name} {chosenUser!.lastname}
            </h1>
          </span>
          <span>
            <h1>{chosenUser!.surname}</h1>
          </span>
        </div>

        <div className="text-center text-xs text-slate-500">
          <span>Student ID: {chosenUser!.id}</span>
        </div>
      </div>
    </div>
  );
};
