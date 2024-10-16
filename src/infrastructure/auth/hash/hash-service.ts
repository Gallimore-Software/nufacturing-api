import bcrypt from 'bcrypt';
import { injectable } from 'inversify'; // Import injectable decorator
import { IHashService } from '../../../domain/interfaces/infrastructure/services/hash/hash-service.interface';

@injectable() // Add this decorator to make the class injectable
export class HashService implements IHashService {
  async compare(plainText: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(plainText, hashed);
  }

  async hash(plainText: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(plainText, salt);
  }
}
