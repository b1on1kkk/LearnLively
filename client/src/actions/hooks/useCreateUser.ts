import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { SignState } from "../interfaces/Registration/Validation";
import { QUERY_ROOT } from "../constants/Query/query";

const useCreateUser = () => {
  return useMutation<null, AxiosError, SignState>({
    mutationFn: (user: SignState) =>
      axios
        .post(`${QUERY_ROOT}auth/signup`, user, { withCredentials: true })
        .then((res) => res.data)
  });
};

export default useCreateUser;
