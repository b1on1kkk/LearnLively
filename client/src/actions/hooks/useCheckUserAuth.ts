import axios, { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";

import { QUERY_ROOT } from "../constants/Query/query";

import type { TUserCheck } from "../interfaces/Registration/Validation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { userActions } from "../store/features/user.slice";

const useCheckUserAuth = () => {
  const dispatch = useDispatch<AppDispatch>();

  return useQuery<TUserCheck, AxiosError>({
    queryKey: ["auth", "user_check"],
    queryFn: async () => {
      return await axios
        .get<TUserCheck>(`${QUERY_ROOT}api/user`, { withCredentials: true })
        .then((res) => {
          dispatch(userActions.createUser(res.data.user));
          return res.data;
        })
        .catch((err) => err);
    }
  });
};

export default useCheckUserAuth;
