import { injectable } from 'inversify';
import jwt from 'jsonwebtoken';

@injectable()
export class JWTService {
  generateToken(payload: object, secret: string, expiresIn: string): string {
    return jwt.sign(payload, secret, { expiresIn });
  }

  verifyToken(token: string, secret: string): any {
    return jwt.verify(token, secret);
  }

  decodeToken(token: string): any {
    return jwt.decode(token);
  }
}
