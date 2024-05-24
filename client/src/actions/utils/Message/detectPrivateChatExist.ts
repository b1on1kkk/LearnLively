import { isTypingConvs } from "../../store/interfaces/isTypingConvs.interface";

export function detectPrivateChatExist(
  data: Array<isTypingConvs>,
  conv_id: number
) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].conv_id === conv_id) return true;
  }

  return false;
}
