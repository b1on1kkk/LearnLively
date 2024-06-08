import { Image } from "@nextui-org/react";

import { useSelector } from "react-redux";

import { RootState } from "../../store/store";

import { ImageBasedOnType } from "../../utils/Image/ImageBasedOnType";

export const AsideHeader = () => {
  const { chosenUser } = useSelector((cu: RootState) => cu.chosenUserChat);

  return (
    <div className="relative">
      <Image
        isZoomed
        removeWrapper={false}
        src={ImageBasedOnType(
          chosenUser!.external_status,
          chosenUser!.img_hash_name
        )}
        alt="student avatar"
      />
      <div className="bg-[#050615] backdrop-opacity-25 block rounded-lg px-5 py-3 z-10 bg-opacity-90 border-2 border-slate-900 absolute bottom-0 left-[50%] -translate-x-[50%] w-[200px] mb-3">
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
