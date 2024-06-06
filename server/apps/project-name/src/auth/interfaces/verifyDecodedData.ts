import type { DecodedData } from 'apps/interfaces/decodedJwtData';

export interface verifyDecodedData extends DecodedData {
  device_id: string;
  remember_me: string;
}
