import { Injectable } from '@nestjs/common';
import { access } from 'fs/promises';

@Injectable()
export class Helpers {
  constructor() {}

  async fileExistsChecker(filePath: string): Promise<boolean> {
    try {
      await access(filePath);
      return true;
    } catch (error) {
      return false;
    }
  }
}
