import { Image } from "@nextui-org/react";
import type { TAsideHeader } from "../../interfaces/Students/Aside";

export const AsideHeader = ({
  image_link,
  name,
  lastname,
  surname,
  id
}: TAsideHeader) => {
  return (
    <div>
      <Image
        isZoomed
        removeWrapper={false}
        src={image_link}
        alt="student avatar"
      ></Image>
      <div className="bg-[#050615] backdrop-opacity-25 block rounded-lg p-3 -mt-[130px] z-10 relative m-4 bg-opacity-90 border-2 border-slate-900">
        <div className="text-2xl text-center font-bold mb-3">
          <span>
            <h1>
              {name} {lastname}
            </h1>
          </span>
          <span>
            <h1>{surname}</h1>
          </span>
        </div>

        <div className="text-center text-xs text-slate-500">
          <span>Student ID: {id}</span>
        </div>
      </div>
    </div>
  );
};
