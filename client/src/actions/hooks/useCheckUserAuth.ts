import axios, { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";

import { QUERY_ROOT } from "../constants/Query/query";

import type { TUserCheck, User } from "../interfaces/Registration/Validation";

const useCheckUserAuth = (userSetter: (c: User) => void) => {
  return useQuery<TUserCheck, AxiosError>({
    queryKey: ["auth", "user_check"],
    queryFn: () =>
      axios
        .get(`${QUERY_ROOT}auth/user`, { withCredentials: true })
        .then((res) => {
          userSetter(res.data.user);
          return res.data;
        })
  });
};

export default useCheckUserAuth;
