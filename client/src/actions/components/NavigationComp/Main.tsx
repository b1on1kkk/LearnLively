import { Image } from "@nextui-org/react";
import { useSelector } from "react-redux";

import { RootState } from "../../store/store";

import { ImageBasedOnType } from "../../utils/Image/ImageBasedOnType";

export const Main = () => {
  const { user } = useSelector((u: RootState) => u.user);

  return (
    <div className="flex justify-center flex-col items-center py-6 border-b-1 border-slate-800 h-[280px]">
      {user ? (
        <>
          <Image
            isBlurred
            alt="user avatar"
            width={160}
            src={ImageBasedOnType(user.external_status, user.img_hash_name)}
          />

          <div className="flex flex-col items-center mt-4">
            <span className="text-xl text-white font-semibold">
              {user.name} {user.lastname}
            </span>
            <span className="text-xs text-slate-500 font-semibold mt-1">
              {user.role}
            </span>
          </div>
        </>
      ) : (
        <>
          <div className="w-[160px] h-[160px] bg-gray-600 rounded-lg animate-pulse" />

          <div className="w-[130px] h-[20px] bg-gray-600 rounded-lg mt-4 animate-pulse" />

          <div className="w-[70px] h-[13px] bg-gray-600 rounded-lg mt-1 animate-pulse" />
        </>
      )}
    </div>
  );
};
