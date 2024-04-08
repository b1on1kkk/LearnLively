import { Injectable } from '@nestjs/common';

@Injectable()
export class SharedService {
  private new_cookie: string;

  setCookie(cookie: string) {
    this.new_cookie = cookie;
  }

  getCookie() {
    return this.new_cookie;
  }
}
