import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class SharedService {
  private new_cookie: string;

  constructor(private readonly jwtService: JwtService) {
    this.new_cookie = '';
  }

  setCookie(cookie: string) {
    this.new_cookie = cookie;
  }

  getCookie() {
    return this.new_cookie;
  }

  cookieExpirationChecker(cookie: string) {
    try {
      this.jwtService.verify(cookie, { secret: process.env.JWT_SECRET_KEY });
      return true;
    } catch (error) {
      return false;
    }
  }
}
