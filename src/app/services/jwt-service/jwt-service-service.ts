import { JWTPayload } from '@domain/interfaces/jwt/jwt-payload.interface';
import Logger from '@infrastructure/logging/logger';
import { injectable } from 'inversify';
import jwt from 'jsonwebtoken';

@injectable()
export class JWTService {
  generateToken(payload: object, secret: string, expiresIn: string): string {
    return jwt.sign(payload, secret, { expiresIn });
  }

  public verifyToken(token: string, secret: string): JWTPayload | null {
    try {
      const decoded = jwt.verify(token, secret) as JWTPayload;
      return decoded;
    } catch (error: unknown) {
      Logger.error(error);
      return null; // In case of invalid token, return null
    }
  }
  decodeToken(token: string): unknown {
    return jwt.decode(token);
  }
}
