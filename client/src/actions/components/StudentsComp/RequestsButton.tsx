import { Button, Tooltip } from "@nextui-org/react";

import { requestButtonClassNames } from "../../constants/Students/styles";

import type { TRequestsButton } from "../../interfaces/Students/Main";

export const RequestsButton = ({
  placement,
  content,
  onClick,
  status,
  image
}: TRequestsButton) => {
  return (
    <div>
      <Tooltip
        placement={placement}
        content={content}
        delay={0}
        closeDelay={0}
        classNames={requestButtonClassNames}
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
