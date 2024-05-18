import axios, { AxiosError } from "axios";

import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";

import { AppDispatch } from "../store/store";
import { chatsActions } from "../store/features/chats.slice";

import { QUERY_ROOT } from "../constants/Query/query";

import type { TChats, TGroups } from "../interfaces/Message/Chats";
import { Key } from "react";
import { groupsActions } from "../store/features/groups.slice";

function isTChats(data: TChats | TGroups): data is TChats {
  return (data as TChats).users_conversations !== undefined;
}

const useChats = <T extends TChats | TGroups>(type: Exclude<Key, bigint>) => {
  const dispatch = useDispatch<AppDispatch>();

  console.log(type);

  return useQuery<T, AxiosError>({
    queryKey: ["api", type],
    queryFn: async () => {
      return await axios
        .get<T>(`${QUERY_ROOT}api/${type}_chats`, {
          withCredentials: true
        })
        .then((res) => {
          // console.log(isTChats(res.data));

          if (isTChats(res.data)) {
            dispatch(chatsActions.initChats(res.data.users_conversations));
          } else {
            dispatch(groupsActions.initGroups(res.data.groups));
          }

          return res.data;
        })
        .catch((err) => err);
    },
    staleTime: 0
  });
};

export default useChats;
