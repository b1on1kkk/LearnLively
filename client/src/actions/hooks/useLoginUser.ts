import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QUERY_ROOT } from "../constants/Query/query";

import type { SignState } from "../interfaces/Registration/Validation";

const useLoginUser = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<
    null,
    AxiosError,
    Omit<SignState, "name" | "lastname" | "surname">
  >({
    mutationFn: (user: Omit<SignState, "name" | "lastname" | "surname">) =>
      axios
        .post(
          `${QUERY_ROOT}auth/login`,
          {
            email: user.email,
            password: user.password
          },
          { withCredentials: true }
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
