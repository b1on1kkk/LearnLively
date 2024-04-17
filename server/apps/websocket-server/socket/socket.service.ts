import {
  ConnectedSocket,
  OnGatewayConnection,
  WebSocketGateway,
} from '@nestjs/websockets';

import { Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class SocketService implements OnGatewayConnection {
  handleConnection(@ConnectedSocket() client: Socket) {
    console.log('connected');
    console.log(client.id);
  }
}
