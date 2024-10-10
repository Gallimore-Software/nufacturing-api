import { IJWTService } from '@domain/interfaces/jwt-service.interface';
import jwt, { JwtPayload } from 'jsonwebtoken';

export class JWTService implements IJWTService {
  sign(payload: object): string {
    return jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: '1h',
    });
  }

  verify(token: string): object {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    // Check if decoded is an object (JwtPayload) or a string
    if (typeof decoded === 'object' && decoded !== null) {
      return decoded as JwtPayload; // Return as JwtPayload if it's an object
    } else {
      throw new Error('Invalid token payload');
    }
  }
}
