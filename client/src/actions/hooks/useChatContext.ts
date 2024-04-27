import { useContext } from "react";

import { MyChatContext } from "../context/Message/chatContext";

const useChatContext = () => useContext(MyChatContext);

export default useChatContext;
