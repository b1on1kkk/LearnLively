import axios, { AxiosError } from "axios";

import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";

import { QUERY_ROOT } from "../constants/Query/query";

import { AppDispatch, RootState } from "../store/store";
import { userActions } from "../store/features/user.slice";

import { identifyInnerRouting } from "../utils/UserAuth/identifyInnerRouting";

import type { TUserCheck } from "../interfaces/Registration/Validation";

const useCheckUserAuth = (path: string) => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((u: RootState) => u.user);

  return useQuery<TUserCheck, AxiosError>({
    queryKey: ["auth", "user_check", identifyInnerRouting(path)],
    queryFn: async () => {
      return await axios
        .get<TUserCheck>(`${QUERY_ROOT}api/user`, { withCredentials: true })
        .then((res) => {
          if (!user) dispatch(userActions.createUser({ user: res.data.user }));

          return res.data;
        })
        .catch((err) => {
          throw err;
        });
    },
    staleTime: 0
  });
};

export default useCheckUserAuth;
