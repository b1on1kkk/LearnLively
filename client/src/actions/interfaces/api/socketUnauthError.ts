export interface SocketUnauthError {
  error: { message: string; statusCode: number };
  message: string;
}
