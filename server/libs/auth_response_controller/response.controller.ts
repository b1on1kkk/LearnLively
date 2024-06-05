import { Injectable } from '@nestjs/common';

import type { Response } from 'express';

@Injectable()
export class AuthResponseController {
  public successfulResponse(
    res: Response,
    payload: { access: string; refresh: string },
    message: any,
  ) {
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
}
