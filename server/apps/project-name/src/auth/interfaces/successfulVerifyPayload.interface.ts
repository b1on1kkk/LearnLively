export interface successfulVerifyPayload {
  message: string;
  status: boolean;
  tokens: {
    access: string;
    refresh: string | null;
  } | null;
}
