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
          sameSite: 'none',
          secure: true,
        })
        .cookie('refresh', payload.refresh, {
          httpOnly: true,
          maxAge: 86400000, // alive 1d
          sameSite: 'none',
          secure: true,
        })
        .json(message);
    }

    return res
      .cookie('access', payload.access, {
        httpOnly: true,
        maxAge: 3600000, // alive 1h
        sameSite: 'none',
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
        maxAge: 3600000, // alive 1h
        sameSite: 'none',
        secure: true,
      })
      .clearCookie('refresh', {
        httpOnly: true,
        maxAge: 86400000, // alive 1d
        sameSite: 'none',
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
          sameSite: 'none',
          secure: true,
        })
        .cookie('refresh', payload.tokens.refresh, {
          httpOnly: true,
          maxAge: 86400000, // alive 1d
          sameSite: 'none',
          secure: true,
        })
        .send(payload.message);
    }

    return res
      .cookie('access', payload.tokens.access, {
        httpOnly: true,
        maxAge: 3600000, // alive 1h
        sameSite: 'none',
        secure: true,
      })
      .send(payload.message);
  }

  public successfulExternalResponse(
    res: Response,
    tokens: { access: string; refresh: string },
  ) {
    return res
      .cookie('access', tokens.access, {
        httpOnly: true,
        maxAge: 3600000, // alive 1h
        sameSite: 'none',
        secure: true,
      })
      .cookie('refresh', tokens.refresh, {
        httpOnly: true,
        maxAge: 86400000, // alive 1d
        sameSite: 'none',
        secure: true,
      })
      .redirect(process.env.CLIENT_ROOT_DOMAIN);
  }
}
