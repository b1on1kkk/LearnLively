import { useEffect, useRef } from "react";

import { useSelector } from "react-redux";

import { RootState } from "../store/store";

import type { ChosenConv } from "../interfaces/Message/Chats";

const useCacheChosenConvId = () => {
  const { chosenConvId } = useSelector((s: RootState) => s.chatSocket);

  const chosenConvIdRef = useRef<ChosenConv | null>(chosenConvId);

  useEffect(() => {
    if (chosenConvId) chosenConvIdRef.current = chosenConvId;
  }, [chosenConvId]);

  return { chosenConvIdRef };
};

export default useCacheChosenConvId;
