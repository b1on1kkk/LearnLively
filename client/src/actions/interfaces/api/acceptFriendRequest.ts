import { TSendFriendRequest } from "./sendFriendRequest";

export interface TFriendRequest extends TSendFriendRequest {
  request_id: number;
}
