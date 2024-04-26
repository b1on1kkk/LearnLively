import axios, { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";

import { QUERY_ROOT } from "../constants/Query/query";

import { AppDispatch, RootState } from "../store/store";
import { userActions } from "../store/features/user.slice";

import type { TUserCheck } from "../interfaces/Registration/Validation";

const useCheckUserAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((u: RootState) => u.user);

  return useQuery<TUserCheck, AxiosError>({
    queryKey: ["auth", "user_check"],
    queryFn: async () => {
      if (!user) {
        return await axios
          .get<TUserCheck>(`${QUERY_ROOT}api/user`, { withCredentials: true })
          .then((res) => {
            dispatch(userActions.createUser({ user: res.data.user }));
            return res.data;
          })
          .catch((err) => err);
      }

      return { user: user, result: true };
    }
  });
};

export default useCheckUserAuth;
