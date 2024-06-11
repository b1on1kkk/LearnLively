import { useMemo } from "react";
import { useSelector } from "react-redux";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from "@nextui-org/react";

import { RootState } from "../../store/store";

import { ChatSocketController } from "../../api/chat-socket/chat-socket-controller";

import type { ConfirmationPayload } from "../../interfaces/Message/Chats";

export const ConfirmationModal = ({
  isOpen,
  onOpenChange
}: ConfirmationPayload) => {
  const { chat_socket, chosenConvId } = useSelector(
    (c: RootState) => c.chatSocket
  );
  const { messages, chosenMessage } = useSelector((m: RootState) => m.messages);

  const chatSocketController = useMemo(
    () => new ChatSocketController(chat_socket),
    []
  );

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="md">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>
              <h1 className="text-lg">Are you sure doing this?</h1>
            </ModalHeader>
            <ModalBody>
              <p>
                Messages that you chose will be removed{" "}
                <span className="underline decoration-[#f31260] decoration-2">
                  forever!
                </span>{" "}
                Press <span className="font-bold text-[#f31260]">Delete</span>{" "}
                button to continue.
              </p>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                onPress={() => {
                  chatSocketController.deleteMsgController(
                    chosenConvId,
                    messages,
                    chosenMessage?.message_data
                  );

                  onClose();
                }}
              >
                Delete
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
