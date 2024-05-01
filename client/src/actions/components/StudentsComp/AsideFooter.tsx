import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

import { Button } from "@nextui-org/react";

import useSocketControllerContext from "../../hooks/useSocketControllerContext";

export const AsideFooter = () => {
  const { user } = useSelector((u: RootState) => u.user);
  const { students } = useSelector((u: RootState) => u.students);
  const { chosenUser } = useSelector((cu: RootState) => cu.chosenUserChat);

  const { socketController } = useSocketControllerContext();

  return (
    <div className="flex-1 flex items-end">
      {chosenUser && user && students && (
        <>
          {chosenUser.friends_friends_friend_idTousers.length > 0 ? (
            <>
              {chosenUser.friends_friends_friend_idTousers[0].status ===
              "pending" ? (
                <Button
                  className="w-full text-lg font-semibold"
                  color="primary"
                >
                  Friend request was sent!
                </Button>
              ) : (
                <Button
                  className="w-full text-lg font-semibold"
                  color="primary"
                >
                  Your friend!
                </Button>
              )}
            </>
          ) : chosenUser.friends_friends_user_idTousers.length > 0 ? (
            <>
              {chosenUser.friends_friends_user_idTousers[0].status ===
              "pending" ? (
                <div className="flex flex-col w-full text-center gap-2">
                  <div>
                    <p className="font-semibold">You have friend request!</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      className="flex-1 font-semibold bg-green-500"
                      onClick={() =>
                        socketController?.acceptFriendRequest(chosenUser)
                      }
                    >
                      Accept
                    </Button>
                    <Button
                      className="flex-1 font-semibold bg-red-500"
                      onClick={() =>
                        socketController?.rejectFriendRequest(chosenUser)
                      }
                    >
                      Reject
                    </Button>
                  </div>
                </div>
              ) : (
                <Button
                  className="w-full text-lg font-semibold"
                  color="primary"
                >
                  Your friend!
                </Button>
              )}
            </>
          ) : (
            <Button
              className="w-full text-lg font-semibold"
              color="primary"
              onClick={() =>
                socketController?.sendFriendRequest(user.id, chosenUser.id)
              }
            >
              Be friends!
            </Button>
          )}
        </>
      )}
    </div>
  );
};
