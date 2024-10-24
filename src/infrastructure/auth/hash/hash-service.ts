import bcrypt from 'bcrypt';
import { injectable } from 'inversify';
import { IHashService } from '@domain/interfaces/infrastructure/services/hash/hash-service.interface';

@injectable()
export class HashService implements IHashService {
  // Compare plain text password with hashed password
  async compare(plainText: string, hashed: string): Promise<boolean> {
    try {
      return await bcrypt.compare(plainText, hashed);
    } catch (error) {
      console.error('Error comparing hash:', error);
      return false; // Return false if comparison fails
    }
  }

  // Generate a hash from a plain text password
  async hash(plainText: string): Promise<string> {
    try {
      const salt = await bcrypt.genSalt(10);
      return await bcrypt.hash(plainText, salt);
    } catch (error) {
      console.error('Error generating hash:', error);
      throw new Error('Hash generation failed');
    }
  }
}
