import axios, { AxiosError } from "axios";

import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";

import { AppDispatch } from "../store/store";
import { messagesActions } from "../store/features/messages.slice";

import { QUERY_ROOT } from "../constants/Query/query";

import type { TMessage } from "../interfaces/api/newChat";
import type { ChosenConv } from "../interfaces/Message/Chats";

const useMessages = (conv_id: ChosenConv | null) => {
  const dispatch = useDispatch<AppDispatch>();

  return useQuery<Array<TMessage>, AxiosError>({
    queryKey: ["api", "messages", conv_id],
    queryFn: async () => {
      if (conv_id) {
        return await axios
          .post<Array<TMessage>>(
            `${QUERY_ROOT}api/messages`,
            {
              conv_id: conv_id.id
            },
            {
              withCredentials: true
            }
          )
          .then((res) => {
            // extend object by adding new field "selected" to use it when user selects message
            const extendedArr = res.data.map((message) => {
              return {
                ...message,
                selected: false
              };
            });

            dispatch(
              messagesActions.messageInit({
                messages: extendedArr,
                chosenMessage: null
              })
            );
            return res.data;
          })
          .catch((err) => err);
      }

      return [];
    },
    staleTime: 0
  });
};

export default useMessages;
