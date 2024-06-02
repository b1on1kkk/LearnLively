import { ArgumentsHost, Catch, UnauthorizedException } from '@nestjs/common';
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets';

import { Socket } from 'socket.io';

@Catch(UnauthorizedException)
export class BadRequestExceptionsFilter extends BaseWsExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const wsException = new WsException(exception.getResponse());

    const socket = host.switchToWs().getClient<Socket>();
    socket.emit('error', wsException);

    super.catch(wsException, host);
  }
}
