import type { DecodedData } from 'apps/interfaces/decodedJwtData';

export interface verifyDecodedData extends DecodedData {
  device_id: string;
}
