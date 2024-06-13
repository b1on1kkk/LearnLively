import { Button, Tooltip } from "@nextui-org/react";

import {
  positiveButtonClassNames,
  negativeButtonClassNames
} from "../../constants/Students/styles";

import type { TRequestsButton } from "../../interfaces/Students/Main";

export const RequestsButton = ({
  placement,
  content,
  onClick,
  status,
  image,
  classNameStatus
}: TRequestsButton) => {
  return (
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
  );
};
