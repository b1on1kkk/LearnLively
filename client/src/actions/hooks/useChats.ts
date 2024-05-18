import axios, { AxiosError } from "axios";

import { useQuery } from "@tanstack/react-query";

import { QUERY_ROOT } from "../constants/Query/query";

import type { TChats } from "../interfaces/Message/Chats";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { chatsActions } from "../store/features/chats.slice";
import { Key } from "react";

const useChats = (chat_type: Key) => {
  const dispatch = useDispatch<AppDispatch>();

  return useQuery<TChats, AxiosError>({
    queryKey: ["api", "chats", chat_type],
    queryFn: async () => {
      return await axios
        .get<TChats>(`${QUERY_ROOT}api/chats?type=${chat_type}`, {
          withCredentials: true
        })
        .then((res) => {
          dispatch(chatsActions.initChats(res.data.users_conversations));
          return res.data;
        })
        .catch((err) => err);
    },
    staleTime: 0
  });
};

export default useChats;
