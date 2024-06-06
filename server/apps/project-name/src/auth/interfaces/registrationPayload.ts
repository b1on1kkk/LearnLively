export interface ResponsePayload {
  device_id: any;
  tokens: {
    access: string;
    refresh: string | null;
  };
}
