import { Button, Tooltip } from "@nextui-org/react";

import {
  positiveButtonClassNames,
  negativeButtonClassNames
} from "../../constants/Students/styles";

import type { TRequestsButton } from "../../interfaces/Students/Main";
// import { useEffect, useState } from "react";

// import { Spinner } from "@nextui-org/react";

export const RequestsButton = ({
  placement,
  content,
  onClick,
  status,
  image,
  classNameStatus
}: TRequestsButton) => {
  // const [isLoading, setIsLoading] = useState<boolean>(false);

  // useEffect(() => {
  //   return () => {
  //     console.log("worked unmounting");
  //     setIsLoading(false);
  //   };
  // }, [isLoading]);

  // console.log(isLoading);

  return (
    <div>
      {/* {isLoading ? (
        <Button
          className={`min-w-0 p-0 px-2.5 bg-transparent`}
          onClick={onClick}
        >
          <Spinner color="primary" size="sm" />
        </Button>
      ) : (
        <Tooltip
          placement={placement}
          content={content}
          delay={0}
          closeDelay={0}
          classNames={
            classNameStatus === "positive"
              ? positiveButtonClassNames
              : negativeButtonClassNames
          }
        >
          <Button
            className={`min-w-0 p-0 px-2.5 bg-transparent ${
              status === "accept" ? "hover:bg-green-500" : "hover:bg-red-500"
            } text-slate-500 hover:text-white`}
            onClick={() => {
              onClick();

              setIsLoading(true);
            }}
          >
            {image}
          </Button>
        </Tooltip>
      )} */}

      <Tooltip
        placement={placement}
        content={content}
        delay={0}
        closeDelay={0}
        classNames={
          classNameStatus === "positive"
            ? positiveButtonClassNames
            : negativeButtonClassNames
        }
      >
        <Button
          className={`min-w-0 p-0 px-2.5 bg-transparent ${
            status === "accept" ? "hover:bg-green-500" : "hover:bg-red-500"
          } text-slate-500 hover:text-white`}
          onClick={onClick}
        >
          {image}
        </Button>
      </Tooltip>
    </div>
  );
};
