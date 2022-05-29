import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
const configService = new ConfigService();

export class Crypt {
  static saltRounds = 10;

  static async hashString(input: string): Promise<string> {
    return await bcrypt.hash(input, this.saltRounds);
  }

  static async compare(plainString: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(plainString, hash);
  }
}
