import axios, { AxiosError } from "axios";

import { useQuery } from "@tanstack/react-query";

import { QUERY_ROOT } from "../constants/Query/query";

import type { TMessage } from "../interfaces/api/newChat";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { messagesAcitons } from "../store/features/messages.slice";

const useMessages = (conv_id: number | null) => {
  const dispatch = useDispatch<AppDispatch>();

  return useQuery<Array<TMessage>, AxiosError>({
    queryKey: ["api", "messages"],
    queryFn: async () => {
      if (conv_id) {
        return await axios
          .post<Array<TMessage>>(
            `${QUERY_ROOT}api/messages`,
            {
              conv_id
            },
            {
              withCredentials: true
            }
          )
          .then((res) => {
            dispatch(messagesAcitons.messageInit(res.data));
            return res.data;
          })
          .catch((err) => err);
      }

      return [];
    }
  });
};

export default useMessages;
