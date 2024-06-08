import type { GoogleAuthUserPayload } from '../interfaces/googleAuthUserPayload.interface';

export class GetGoogleAuth {
  private static type: 'signup' | 'login';
  private static user: GoogleAuthUserPayload;

  static setType(auth: 'signup' | 'login') {
    this.type = auth;
  }

  static getType() {
    return this.type;
  }

  static setUser(user: GoogleAuthUserPayload) {
    this.user = user;
  }

  static getUser() {
    return this.user;
  }
}
