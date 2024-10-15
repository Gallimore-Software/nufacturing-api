// jwt-service.ts
import jwt, { JwtPayload } from 'jsonwebtoken';
import { IJWTService } from '@domain/interfaces/infrastructure/services/jwt/jwt-service.interface';

export class JWTService implements IJWTService {
  sign(payload: object, expiresIn: string = '1h'): string {
    return jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn,
    });
  }

  verify(token: string): JwtPayload {
    return jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
  }

  signRefreshToken(payload: object): string {
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET as string, {
      expiresIn: '7d', // Long-lived refresh token
    });
  }

  verifyRefreshToken(token: string): JwtPayload {
    return jwt.verify(
      token,
      process.env.JWT_REFRESH_SECRET as string
    ) as JwtPayload;
  }
}
