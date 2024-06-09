import axios, { AxiosError } from "axios";

import { useMutation } from "@tanstack/react-query";

import { QUERY_ROOT } from "../constants/Query/query";

import type { TSeenMessages } from "../interfaces/Message/Chats";

const useLastSeenMessage = () => {
  return useMutation<TSeenMessages, AxiosError, { message_id: number }>({
    mutationFn: (message: { message_id: number }) =>
      axios
        .post(
          `${QUERY_ROOT}api/seen_message`,
          {
            message_id: message.message_id
          },
          { withCredentials: true }
        )
        .then((res) => {
          return res.data;
        })
  });
};

export default useLastSeenMessage;
