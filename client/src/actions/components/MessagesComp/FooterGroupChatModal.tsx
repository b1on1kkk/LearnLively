import { Info } from "lucide-react";
import { Button, Tooltip } from "@nextui-org/react";

import type { GroupModalSteps } from "../../interfaces/Students/Main";

interface TFooterGroupChatModal {
  title: string;
  next: GroupModalSteps;
  chosenIndexesLength: number;
  onPressBack: () => void;
  onPressNext: () => void;
  onPressCreateGroup: () => void;
}

export const FooterGroupChatModal = ({
  next,
  title,
  chosenIndexesLength,
  onPressBack,
  onPressNext,
  onPressCreateGroup
}: TFooterGroupChatModal) => {
  return (
    <>
      <div className="min-w-10 flex items-center flex-1">
        <Tooltip
          delay={0}
          closeDelay={0}
          content={
            <div className="p-1">
              <div className="text-small font-semibold">Small tip</div>
              <div className="text-tiny">{next.tooltip_text}</div>
            </div>
          }
          color="primary"
          classNames={{ base: "w-[200px]" }}
        >
          <Info
            width={20}
            height={20}
            className="text-slate-400 hover:text-white transition-colors duration-200"
          />
        </Tooltip>
      </div>

      {next.backButton && (
        <Button
          color="primary"
          onPress={onPressBack}
          className="font-semibold text-sm"
        >
          Back
        </Button>
      )}

      {next.nextButton && (
        <Button
          color="primary"
          onPress={onPressNext}
          className="font-semibold text-sm"
          isDisabled={chosenIndexesLength > 1 ? false : true}
        >
          Next
        </Button>
      )}

      {next.createButton && (
        <Button
          color="primary"
          onPress={onPressCreateGroup}
          className="font-semibold text-sm"
          isDisabled={title.trim() ? false : true}
        >
          Create group
        </Button>
      )}
    </>
  );
};
