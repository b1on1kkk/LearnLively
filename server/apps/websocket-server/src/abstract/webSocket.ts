import { ConnectedUserDTO } from 'apps/websocket-server/dto/connectedUserDTO';

import { Socket } from 'socket.io';

export default abstract class WebSocket {
  abstract connectionMessage(dto: ConnectedUserDTO, client: Socket): void;

  abstract disconnectionMessage(client: Socket): void;
}
