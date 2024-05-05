import { Button } from "@nextui-org/react";
import { Reply, Trash, X } from "lucide-react";

import { SystemButton } from "../SystemButton";
import useSelectedMessagesCounter from "../../hooks/useSelectedMessagesCounter";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export const SelectedFooterMessagesButtons = ({
  onOpen,
  onCloseSelection
}: {
  onOpen: () => void;
  onCloseSelection: () => void;
}) => {
  const { messages } = useSelector((m: RootState) => m.messages);
  const { selectedMessages } = useSelectedMessagesCounter(messages);

  return (
    <div className="flex">
      <div className="flex-1 flex gap-2">
        <Button
          color="primary"
          className="font-semibold min-w-32"
          startContent={<Reply height={18} width={18}></Reply>}
          endContent={<span>{selectedMessages}</span>}
          onClick={() => {}}
        >
          Forward
        </Button>
        <Button
          color="danger"
          className="font-semibold min-w-32"
          startContent={<Trash height={18} width={18}></Trash>}
          endContent={<span>{selectedMessages}</span>}
          onClick={() => onOpen()}
        >
          Delete
        </Button>
      </div>

      <SystemButton
        icon={<X width={18} height={18} />}
        label="close"
        onClick={onCloseSelection}
      />
    </div>
  );
};
