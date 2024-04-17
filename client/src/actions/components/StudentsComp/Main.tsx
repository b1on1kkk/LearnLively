import { Spinner, Button, Tooltip } from "@nextui-org/react";

import { Plus } from "lucide-react";

import { useStudentsContext } from "../../hooks/useStudentsContext";

import type {
  Student,
  TMainStudents,
  UserFriend
} from "../../interfaces/Students/Main";
import { useMutation } from "@tanstack/react-query";

import axios, { AxiosError } from "axios";

import { QUERY_ROOT } from "../../constants/Query/query";
import useGlobalContext from "../../hooks/useGlobalContext";

const useSendFriendRequest = () => {
  return useMutation<
    Student[],
    AxiosError,
    { sender_id: number; recipient: number }
  >({
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
        .then((res) => res.data)
  });
};

export const Main = ({
  students,
  isLoading,
  isError
}: // setStudents
TMainStudents) => {
  const { chosenUser, setChosenUser } = useStudentsContext();
  const { user } = useGlobalContext();

  const sendFriendRequest = useSendFriendRequest();

  // // just do not to forget
  // // requests that comes from others
  // console.log(user.friends_friends_friend_idTousers, "-friend");

  // // logged in user friend requests
  // console.log(user.friends_friends_user_idTousers, "-user");
  // //

  function checkFriendRequests(array: UserFriend[], id: number) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].user_id === id) return true;
    }

    return false;
  }

  function checkLoggedInSends(array: UserFriend[], id: number) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].friend_id === id) return true;
    }

    return false;
  }

  return (
    <main className="mt-3 h-full bg-[#050615] rounded-2xl shadow-2xl px-6 mb-3 border-slate-900 border-2 overflow-auto">
      {isLoading && (
        <div className="h-full w-full flex items-center justify-center">
          <Spinner classNames={{ circle1: "yellow" }} size="lg"></Spinner>
        </div>
      )}

      {!isError && (
        <ul className="divide-y divide-dashed divide-slate-800">
          {students?.map((student, idx) => {
            return (
              <li className="flex items-center py-1 gap-2" key={idx}>
                <Button
                  className="text-sm text-slate-500 font-semibold w-full bg-transparent justify-start text-start h-unit-2xl hover:bg-gray-600 hover:text-white flex-1"
                  onClick={() => {
                    if (chosenUser !== idx) setChosenUser(idx);
                  }}
                >
                  <span className="flex-[2]">
                    {student.name} {student.lastname} {student.surname}
                  </span>
                  <span className="flex-1">{student.id}</span>
                  <span className="flex-[2]">{student.email}</span>
                  <span className="flex-1">
                    {student.end_semester}/{student.now_semester}
                  </span>
                  <span>{student.department}</span>
                </Button>

                {checkLoggedInSends(
                  user.friends_friends_user_idTousers,
                  student.id
                ) ? (
                  <div>request sent</div>
                ) : checkFriendRequests(
                    user.friends_friends_friend_idTousers,
                    student.id
                  ) ? (
                  <div>request was sent to you</div>
                ) : (
                  <Tooltip
                    placement="right"
                    content="Send friend request"
                    delay={0}
                    closeDelay={0}
                    classNames={{
                      content:
                        "bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%"
                    }}
                  >
                    <Button
                      className="min-w-0 p-0 px-2.5 bg-transparent hover:bg-green-500 text-slate-500 hover:text-white"
                      onClick={() => {
                        sendFriendRequest.mutate({
                          sender_id: user.id,
                          recipient: student.id
                        });
                      }}
                    >
                      <Plus width={20} height={20}></Plus>
                    </Button>
                  </Tooltip>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
};
