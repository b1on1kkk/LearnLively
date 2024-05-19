import axios, { AxiosError } from "axios";

import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";

import { AppDispatch } from "../store/store";
import { messagesActions } from "../store/features/messages.slice";

import { QUERY_ROOT } from "../constants/Query/query";

import type { TMessage } from "../interfaces/api/newChat";
import type { ChosenConv } from "../interfaces/Message/Chats";
import { useEffect } from "react";

const useMessages = (conv_id: ChosenConv | null) => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, isLoading, refetch } = useQuery<Array<TMessage>, AxiosError>({
    queryKey: ["api", "messages", conv_id?.id],
    queryFn: async () => {
      if (conv_id) {
        const response = await axios.post<Array<TMessage>>(
          `${QUERY_ROOT}api/messages`,
          {
            conv_id: conv_id.id
          },
          {
            withCredentials: true
          }
        );
        return response.data;
      }
      return [];
    },
    staleTime: 0
  });

  useEffect(() => {
    if (data) {
      dispatch(
        messagesActions.messageInit({
          messages: data.map((message) => ({
            ...message,
            selected: false
          })),
          chosenMessage: null
        })
      );
    }
  }, [data]);

  return { data, isLoading, refetch };
};

export default useMessages;
