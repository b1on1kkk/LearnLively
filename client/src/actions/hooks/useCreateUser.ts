import axios, { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QUERY_ROOT } from "../constants/Query/query";

import type { SignState } from "../interfaces/Registration/Validation";
import { useNavigate } from "react-router-dom";
import type { RegistrationUser } from "../interfaces/Registration/registration";
import useLocalStorage from "./useLocalStorage";

const useCreateUser = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { setValue } = useLocalStorage("device_id", "");

  return useMutation<RegistrationUser, AxiosError, SignState>({
    mutationFn: (user: SignState) => {
      return axios
        .post<RegistrationUser>(`${QUERY_ROOT}auth/signup`, user, {
          withCredentials: true
        })
        .then((res) => {
          setValue(res.data.payload.device_id);
          return res.data;
        });
    },

    onSuccess: () => {
      navigate("/dashboard");

      queryClient.invalidateQueries({
        queryKey: ["user"]
      });
    }
  });
};

export default useCreateUser;
