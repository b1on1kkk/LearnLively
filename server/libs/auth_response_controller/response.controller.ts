import { Injectable } from '@nestjs/common';
import { successfulVerifyPayload } from 'apps/project-name/src/auth/interfaces/successfulVerifyPayload.interface';

import type { Response } from 'express';

@Injectable()
export class AuthResponseController {
  public successfulResponse(
    res: Response,
    payload: { access: string; refresh: string | null },
    message: any,
  ) {
    if (payload.refresh) {
      return res
        .cookie('access', payload.access, {
          httpOnly: true,
          maxAge: 3600000, // alive 1h
          sameSite: 'strict',
          secure: true,
        })
        .cookie('refresh', payload.refresh, {
          httpOnly: true,
          maxAge: 86400000, // alive 1d
          sameSite: 'strict',
          secure: true,
        })
        .json(message);
    }

    return res
      .cookie('access', payload.access, {
        httpOnly: true,
        maxAge: 3600000, // alive 1h
        sameSite: 'strict',
        secure: true,
      })
      .json(message);
  }

  public successfulLoggedOut(
    res: Response,
    data: { text: string; status: number },
  ) {
    return res
      .clearCookie('access', {
        httpOnly: true,
        sameSite: 'strict',
        secure: true,
      })
      .clearCookie('refresh', {
        httpOnly: true,
        sameSite: 'strict',
        secure: true,
      })
      .json(data);
  }

  public successfulVerification(
    res: Response,
    payload: successfulVerifyPayload,
  ) {
    if (payload.tokens.refresh) {
      return res
        .cookie('access', payload.tokens.access, {
          httpOnly: true,
          maxAge: 3600000, // alive 1h
          sameSite: 'strict',
          secure: true,
        })
        .cookie('refresh', payload.tokens.refresh, {
          httpOnly: true,
          maxAge: 86400000, // alive 1d
          sameSite: 'strict',
          secure: true,
        })
        .send(payload.message);
    }

    return res
      .cookie('access', payload.tokens.access, {
        httpOnly: true,
        maxAge: 3600000, // alive 1h
        sameSite: 'strict',
        secure: true,
      })
      .send(payload.message);
  }
}
