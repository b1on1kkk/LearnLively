import { useMemo } from "react";
import { GroupData } from "../interfaces/Students/Main";

const useFirstChatLetter = (groupHandler: GroupData) => {
  const FirstChatLetter = useMemo(() => {
    if (groupHandler.title.length >= 1) return groupHandler.title[0];
    return "";
  }, [groupHandler.title]);

  return { FirstChatLetter };
};

export default useFirstChatLetter;
