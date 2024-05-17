import { useState } from "react";
import { useSelector } from "react-redux";
import useStudentSelection from "../../hooks/useSelectedUser";
import useGroupDataHandler from "../../hooks/useGroupDataHandler";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from "@nextui-org/react";

import { BodyGroupChatModal } from "./BodyGroupChatModal";
import { FooterGroupChatModal } from "./FooterGroupChatModal";

import { RootState } from "../../store/store";

import { END_GROUP_MODAL_SLIDE } from "../../constants/GroupModal/endSlide";
import { START_GROUP_MODAL_SLIDE } from "../../constants/GroupModal/startSlide";
import { MODAL_CREATION_GROUPCHAT_STYLES } from "../../constants/GroupModal/styles";

import type { GroupModalSteps } from "../../interfaces/Students/Main";
import type { TGroupChatModal } from "../../interfaces/Message/Chats";

export const GroupChatModal = ({ isOpen, onOpenChange }: TGroupChatModal) => {
  const { students } = useSelector((u: RootState) => u.students);

  // extened students array to check user/users with whom create group chat
  const { extendedStudents, createGroupIndexes, selectedUser } =
    useStudentSelection(students);

  // additional group data
  const { groupHandler, groupDataHandler } = useGroupDataHandler();

  const [next, setNext] = useState<GroupModalSteps>(START_GROUP_MODAL_SLIDE);

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="md"
      classNames={MODAL_CREATION_GROUPCHAT_STYLES}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader>{next.title}</ModalHeader>
            <ModalBody>
              <BodyGroupChatModal
                next={next}
                groupHandler={groupHandler}
                groupDataHandler={groupDataHandler}
                selectedUser={selectedUser}
                extendedStudents={extendedStudents}
              />
            </ModalBody>
            <ModalFooter>
              <FooterGroupChatModal
                next={next}
                title={groupHandler.title}
                chosenIndexesLength={createGroupIndexes.length}
                onPressBack={() => setNext(START_GROUP_MODAL_SLIDE)}
                onPressNext={() => setNext(END_GROUP_MODAL_SLIDE)}
                onPressCreateGroup={() => {}}
              />
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};