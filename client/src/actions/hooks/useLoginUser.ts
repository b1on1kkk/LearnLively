import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QUERY_ROOT } from "../constants/Query/query";

import type { SignState } from "../interfaces/Registration/Validation";
import type { errorPayload } from "../interfaces/Registration/errorPayload";
import type { RegistrationUser } from "../interfaces/Registration/registration";

const useLoginUser = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation<
    RegistrationUser,
    AxiosError<errorPayload>,
    Omit<SignState, "name" | "lastname" | "surname">
  >({
    mutationFn: (user: Omit<SignState, "name" | "lastname" | "surname">) =>
      axios
        .post<RegistrationUser>(
          `${QUERY_ROOT}auth/login`,
          {
            email: user.email,
            password: user.password,
            remember_me: user.remember_me
          },
          {
            withCredentials: true
          }
        )
        .then((res) => res.data),

    onSuccess: () => {
      navigate("/dashboard");

      queryClient.invalidateQueries({
        queryKey: ["user"]
      });
    }
  });
};

export default useLoginUser;
