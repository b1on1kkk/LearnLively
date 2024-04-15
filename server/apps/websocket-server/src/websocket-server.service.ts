import { Injectable } from '@nestjs/common';

@Injectable()
export class WebsocketServerService {
  getHello(): string {
    return 'Hello World!';
  }
}
