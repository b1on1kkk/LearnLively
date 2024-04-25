import type { ServiceSocket } from "./service-socket";
import type { Student } from "../../interfaces/Students/Main";

export class SocketController {
  private socket: ServiceSocket | null;

  constructor(socket: ServiceSocket | null) {
    this.socket = socket;
  }

  public acceptFriendRequest(student: Student) {
    const { id, user_id, friend_id } =
      student.friends_friends_user_idTousers[0];

    this.socket?.acceptFriendRequest({
      request_id: id,
      sender_id: friend_id,
      recipient: user_id
    });
  }

  public rejectFriendRequest(student: Student) {
    const { id, user_id, friend_id } =
      student.friends_friends_user_idTousers[0];

    this.socket?.rejectFriendRequest({
      request_id: id,
      sender_id: friend_id,
      recipient: user_id
    });
  }

  public sendFriendRequest(sender_id: number, recipient: number) {
    console.log("send request method worked");

    this.socket?.sendFriendRequest({
      sender_id,
      recipient
    });
  }
}
