import { Request as ExpressRequest } from 'express';

import { GlobalGoogleAuthUserPayload } from 'interfaces/globalGoogleAuthUserPayload.interfaces';

declare module 'express' {
  export interface Request extends ExpressRequest {
    user?: GlobalGoogleAuthUserPayload;
  }
}
