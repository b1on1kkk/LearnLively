export default abstract class WebSocket {
  abstract connectUser(user_id: number): void;

  abstract disconnectUser(user_id: number): void;
}
