import axios, { AxiosError } from "axios";

import useLocalStorage from "./useLocalStorage";
import { useMutation } from "@tanstack/react-query";

import { QUERY_ROOT } from "../constants/Query/query";

import type { SignState } from "../interfaces/Registration/Validation";
import type { RegistrationUser } from "../interfaces/Registration/registration";

const useCreateUser = (setVerifMail: (e: boolean) => void) => {
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

    onSuccess: () => setVerifMail(true)
  });
};

export default useCreateUser;
