import { useDispatch, useSelector } from "react-redux";

import useSocketControllerContext from "../../hooks/useSocketControllerContext";

import { Notification } from "../Notification";
import { RequestsButton } from "./RequestsButton";

import { Spinner, Button } from "@nextui-org/react";

import {
  Plus,
  UserRound,
  UsersRound,
  UserRoundX,
  UserRoundPlus,
  CircleCheckBig
} from "lucide-react";

import { AppDispatch, RootState } from "../../store/store";
import { chosenUserChatActions } from "../../store/features/chosenUserChat.slice";

import type { TMainStudents } from "../../interfaces/Students/Main";

export const Main = ({ isLoading, isError }: TMainStudents) => {
  const dispatch = useDispatch<AppDispatch>();

  const { user } = useSelector((u: RootState) => u.user);
  const { students } = useSelector((u: RootState) => u.students);

  const { socketController } = useSocketControllerContext();

  return (
    <main className="mt-3 h-full bg-[#050615] rounded-2xl shadow-2xl px-6 border-slate-900 border-2 overflow-auto">
      {isLoading && (
        <div className="h-full w-full flex items-center justify-center">
          <Spinner classNames={{ circle1: "yellow" }} size="lg"></Spinner>
        </div>
      )}

      {!isError && students && user && (
        <>
          {students.length > 0 ? (
            <ul className="divide-y divide-dashed divide-slate-800">
              {students.map((student, idx) => {
                return (
                  <li className="flex items-center py-1 gap-2" key={idx}>
                    <Button
                      className="text-sm text-slate-500 font-semibold w-full bg-transparent justify-start text-start h-unit-2xl hover:bg-gray-600 hover:text-white flex-1"
                      onClick={() =>
                        dispatch(
                          chosenUserChatActions.chosenUserInit({
                            chosenGroup: null,
                            chosenUser: student
                          })
                        )
                      }
                    >
                      <span className="flex-[2] max-w-[290px] truncate">
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
                      {student.friends_friends_friend_idTousers.length > 0 ? (
                        <>
                          {student.friends_friends_friend_idTousers[0]
                            .status === "pending" ? (
                            <RequestsButton
                              placement="right"
                              content="Request sent!"
                              status="accept"
                              image={<CircleCheckBig width={20} height={20} />}
                              onClick={() => {}}
                              classNameStatus="positive"
                            />
                          ) : (
                            <RequestsButton
                              placement="right"
                              content="Your friend"
                              status="accept"
                              image={<UserRound width={20} height={20} />}
                              onClick={() => {}}
                              classNameStatus="positive"
                            />
                          )}
                        </>
                      ) : student.friends_friends_user_idTousers.length > 0 ? (
                        <>
                          {student.friends_friends_user_idTousers[0].status ===
                          "pending" ? (
                            <div className="flex gap-2">
                              <RequestsButton
                                placement="left"
                                content="Accept request!"
                                status="accept"
                                image={<UserRoundPlus width={20} height={20} />}
                                onClick={() =>
                                  socketController?.acceptFriendRequest(student)
                                }
                                classNameStatus="positive"
                              />
                              <RequestsButton
                                placement="right"
                                content="Cancel request!"
                                status="reject"
                                image={<UserRoundX width={20} height={20} />}
                                onClick={() =>
                                  socketController?.rejectFriendRequest(student)
                                }
                                classNameStatus="negative"
                              />
                            </div>
                          ) : (
                            <RequestsButton
                              placement="right"
                              content="Your friend"
                              status="accept"
                              image={<UserRound width={20} height={20} />}
                              onClick={() => {}}
                              classNameStatus="positive"
                            />
                          )}
                        </>
                      ) : (
                        <RequestsButton
                          status="accept"
                          placement="right"
                          classNameStatus="positive"
                          content="Send friend request!"
                          image={<Plus width={20} height={20} />}
                          onClick={() => {
                            socketController?.sendFriendRequest(
                              user.id,
                              student.id
                            );
                          }}
                        />
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="flex h-full items-center justify-center">
              <Notification
                icon={<UsersRound width={80} height={80} />}
                message="Students are not found!"
              />
            </div>
          )}
        </>
      )}
    </main>
  );
};
