import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import { SharedService } from '@sharedService/shared';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly sharedService: SharedService,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaClient,
  ) {
    super({
      // get token from cookie or from Bearer as basic
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => req?.cookies?.jwt_lg,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: true,
      secretOrKey: process.env.JWT_SECRET_KEY,
      passReqToCallback: true,
    });
  }

  async validate(payload: Request) {
    try {
      if (Object.keys(payload.cookies).includes('jwt_lg')) {
        const decoded = this.jwtService.decode(payload.cookies['jwt_lg']);

        const refresh_token_data = await this.prisma.refresh_token.findFirst({
          where: {
            user_id: decoded.id,
          },
        });

        if (refresh_token_data.refresh_token) {
          this.sharedService.setCookie(
            this.jwtService.sign(
              { id: decoded.id },
              { secret: process.env.JWT_SECRET_KEY },
            ),
          );
        }
      }
    } catch (error) {
      throw new HttpException(
        'Refresh token is broken, sorry :(',
        HttpStatus.BAD_GATEWAY,
      );
    }

    return payload;
  }
}
