import { Outlet } from "react-router-dom";
import { Image } from "@nextui-org/react";

import { QUERY_ROOT } from "../../constants/Query/query";

export const Registration = () => {
  return (
    <main className="flex h-screen">
      <div className="flex-1 flex items-center justify-center">
        <Image
          isBlurred
          width={900}
          alt="Beautiful abstraction"
          src={`${QUERY_ROOT}api/pictures/_e07a3c3a-0c92-412c-be99-7246521246a3.jpg`}
          classNames={{
            wrapper: "rounded-xl p-5"
          }}
        />
      </div>

      <div className="flex-1 flex justify-center flex-col">
        <Outlet />
      </div>
    </main>
  );
};
