export interface ResponsePayload {
  tokens: {
    access: string;
    refresh: string | null;
  };
}
