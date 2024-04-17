import axios, { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";

import { QUERY_ROOT } from "../constants/Query/query";

import type { TUserCheck, User } from "../interfaces/Registration/Validation";

const useCheckUserAuth = (userSetter: (c: User | null) => void) => {
  return useQuery<TUserCheck, AxiosError>({
    queryKey: ["auth", "user_check"],
    queryFn: () =>
      axios
        .get<TUserCheck>(`${QUERY_ROOT}api/user`, { withCredentials: true })
        .then((res) => {
          userSetter(res.data.user);
          return res.data;
        })
        .catch((err) => err)
  });
};

export default useCheckUserAuth;
