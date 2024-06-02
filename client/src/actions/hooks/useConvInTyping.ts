import { useMemo } from "react";

import type { isTypingConvs } from "../store/interfaces/isTypingConvs.interface";

const useConvInTyping = (
  typed: Array<isTypingConvs>,
  idx: number | undefined
) => {
  return useMemo(() => {
    return typed.find((conversation) => conversation.conv_id === idx);
  }, [typed, idx]);
};

export default useConvInTyping;
