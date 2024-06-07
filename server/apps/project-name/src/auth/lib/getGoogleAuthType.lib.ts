export class GetGoogleAuthType {
  private static type: 'signup' | 'login';

  static setType(auth: 'signup' | 'login') {
    this.type = auth;
  }

  static getType() {
    return this.type;
  }
}
