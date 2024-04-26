import axios, { AxiosError } from "axios";

import { useQuery } from "@tanstack/react-query";

import { QUERY_ROOT } from "../constants/Query/query";

import type { TChats } from "../interfaces/Message/Chats";

const useChats = () => {
  return useQuery<TChats, AxiosError>({
    queryKey: ["api", "chats"],
    queryFn: async () => {
      return await axios
        .get<TChats | Record<string, unknown>>(`${QUERY_ROOT}api/chats`, {
          withCredentials: true
        })
        .then((res) => res.data)
        .catch((err) => err);
    }
  });
};

export default useChats;
