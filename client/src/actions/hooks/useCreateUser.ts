import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

import { QUERY_ROOT } from "../constants/Query/query";

import type { SignState } from "../interfaces/Registration/Validation";
import { useNavigate } from "react-router-dom";

const useCreateUser = () => {
  const navigate = useNavigate();

  return useMutation<null, AxiosError, SignState>({
    mutationFn: (user: SignState) =>
      axios.post(`${QUERY_ROOT}auth/signup`, user).then((res) => res.data),

    onSuccess: () => navigate("/registration/login")
  });
};

export default useCreateUser;
