import useGlobalContext from "../../hooks/useGlobalContext";
import useStudentsContext from "../../hooks/useStudentsContext";

import { RequestsButton } from "./RequestsButton";
import { Spinner, Button } from "@nextui-org/react";
import { Plus, CircleCheckBig, UserRoundPlus, UserRoundX } from "lucide-react";

import type { TMainStudents } from "../../interfaces/Students/Main";
import { useSocketContext } from "../../hooks/useSocketContext";
import { useEffect } from "react";

export const Main = ({ students, isLoading, isError }: TMainStudents) => {
  const { chosenUser, setChosenUser } = useStudentsContext();
  const { user, userSetter } = useGlobalContext();
  const { socket } = useSocketContext();

  // listen if new data comes
  useEffect(() => {
    socket?.getNewUser(userSetter);
  }, [socket]);

  return (
    <main className="mt-3 h-full bg-[#050615] rounded-2xl shadow-2xl px-6 mb-3 border-slate-900 border-2 overflow-auto">
      {isLoading && (
        <div className="h-full w-full flex items-center justify-center">
          <Spinner classNames={{ circle1: "yellow" }} size="lg"></Spinner>
        </div>
      )}

      {!isError && students && user && (
        <ul className="divide-y divide-dashed divide-slate-800">
          {students.map((student, idx) => {
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

                <div className="flex w-[90px] justify-end">
                  {user.friends_friends_friend_idTousers.length > 0 ||
                  user.friends_friends_user_idTousers.length > 0 ? (
                    <>
                      {user.friends_friends_user_idTousers.some(
                        (item) => item.friend_id === student.id
                      ) ? (
                        <RequestsButton
                          placement="right"
                          content="Request sent!"
                          status="accept"
                          image={<CircleCheckBig width={20} height={20} />}
                          onClick={() => {}}
                        />
                      ) : (
                        <>
                          {user.friends_friends_friend_idTousers.some(
                            (item) => item.user_id === student.id
                          ) ? (
                            <div className="flex gap-2">
                              <RequestsButton
                                placement="left"
                                content="Accept request"
                                status="accept"
                                image={<UserRoundPlus width={20} height={20} />}
                                onClick={() => {}}
                              />
                              <RequestsButton
                                placement="right"
                                content="Cancel request"
                                status="reject"
                                image={<UserRoundX width={20} height={20} />}
                                onClick={() => {}}
                              />
                            </div>
                          ) : (
                            <RequestsButton
                              placement="right"
                              content="Send friend request"
                              status="accept"
                              image={<Plus width={20} height={20} />}
                              onClick={() => {
                                socket?.sendFriendRequest({
                                  sender_id: user.id,
                                  recipient: student.id
                                });

                                //  mutate({
                                //   sender_id: user.id,
                                //   recipient: student.id
                                // });
                              }}
                            />
                          )}
                        </>
                      )}
                    </>
                  ) : (
                    <RequestsButton
                      placement="right"
                      content="Send friend request"
                      status="accept"
                      image={<Plus width={20} height={20} />}
                      onClick={() => {
                        socket?.sendFriendRequest({
                          sender_id: user.id,
                          recipient: student.id
                        });
                      }}
                    />
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
};
