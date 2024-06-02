import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '@prismaORM/prisma';
import { Observable } from 'rxjs';

import { Socket } from 'socket.io';

@Injectable()
export class JwtGuardGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('service_socket guard worked!');

    const { device_id, user_id } = context.switchToWs().getClient<Socket>()
      .handshake.auth;

    if (device_id && user_id) {
      return this.prisma.refresh_token_metadata
        .findFirst({
          where: {
            device_id,
            user_id,
          },
        })
        .then((res) => {
          if (res) return true;
        })
        .catch(() => {
          throw new UnauthorizedException();
        });
    }

    throw new UnauthorizedException();
  }
}
