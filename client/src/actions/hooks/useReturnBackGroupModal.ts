import { useEffect } from "react";

import { START_GROUP_MODAL_SLIDE } from "../constants/GroupModal/startSlide";

import type { GroupModalSteps } from "../interfaces/Students/Main";

const useReturnBackGroupModal = (
  isOpen: boolean,
  next: GroupModalSteps,
  setNext: (c: GroupModalSteps) => void
) => {
  useEffect(() => {
    if (
      !isOpen &&
      JSON.stringify(next) !== JSON.stringify(START_GROUP_MODAL_SLIDE)
    ) {
      setNext(START_GROUP_MODAL_SLIDE);
    }
  }, [isOpen]);
};

export default useReturnBackGroupModal;
