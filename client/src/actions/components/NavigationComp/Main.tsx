import { Image } from "@nextui-org/react";

export const Main = () => {
  return (
    <div className="flex justify-center flex-col items-center py-6 border-b-1 border-slate-800">
      <Image
        isBlurred
        alt="user avatar"
        width={160}
        src="https://nextui-docs-v2.vercel.app/images/album-cover.png"
      ></Image>

      <div className="flex flex-col items-center mt-4">
        <span className="text-xl text-white font-semibold">Haris Ahmed</span>
        <span className="text-xs text-slate-500 font-semibold mt-1">
          Assistant professor
        </span>
      </div>
    </div>
  );
};
