import axios, { AxiosError } from "axios";
import {
  useMutation,
  UseMutationResult,
  useQueryClient
} from "@tanstack/react-query";

import { QUERY_ROOT } from "../constants/Query/query";

import type { Student } from "../interfaces/Students/Main";

interface SendFriendRequestVariables {
  sender_id: number;
  recipient: number;
}

const useSendFriendRequest = (): UseMutationResult<
  Student[],
  AxiosError,
  SendFriendRequestVariables
> => {
  const queryClient = useQueryClient();

  return useMutation<Student[], AxiosError, SendFriendRequestVariables>({
    mutationFn: (user: { sender_id: number; recipient: number }) =>
      axios
        .post(
          `${QUERY_ROOT}api/friend_request`,
          {
            sender_id: user.sender_id,
            recipient: user.recipient
          },
          { withCredentials: true }
        )
        .then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth", "user_check"] });
    }
  });
};

export default useSendFriendRequest;
