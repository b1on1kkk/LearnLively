import { Controller } from '@nestjs/common';
import { WebsocketServerService } from './websocket-server.service';

@Controller()
export class WebsocketServerController {
  constructor(
    private readonly websocketServerService: WebsocketServerService,
  ) {}
}
