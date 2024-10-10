import bcrypt from 'bcrypt';
import { IHashService } from './hash-service.interface';

export class HashService implements IHashService {
  async compare(plainText: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(plainText, hashed);
  }

  async hash(plainText: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(plainText, salt);
  }
}
