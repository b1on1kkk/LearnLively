import axios, { AxiosError } from "axios";

import { useMutation } from "@tanstack/react-query";

import { QUERY_ROOT } from "../constants/Query/query";

import type { SignState } from "../interfaces/Registration/Validation";
import type { errorPayload } from "../interfaces/Registration/errorPayload";
import type { RegistrationUser } from "../interfaces/Registration/registration";

const useCreateUser = (setVerifMail: (e: boolean) => void) => {
  return useMutation<RegistrationUser, AxiosError<errorPayload>, SignState>({
    mutationFn: (user: SignState) => {
      return axios
        .post<RegistrationUser>(`${QUERY_ROOT}auth/signup`, user, {
          withCredentials: true
        })
        .then((res) => res.data);
    },

    onSuccess: () => setVerifMail(true)
  });
};

export default useCreateUser;
