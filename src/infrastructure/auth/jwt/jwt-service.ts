// jwt-service.ts
import jwt, { JwtPayload } from 'jsonwebtoken';
import { IJWTService } from '@domain/interfaces/infrastructure/services/jwt/jwt-service.interface';
import { injectable } from 'inversify';
import { JWTPayload } from '@domain/interfaces/infrastructure/services/jwt/jwt-payload.interface';

@injectable()
export class JWTService implements IJWTService {
  sign(payload: object, expiresIn: string = '1h'): string {
    return jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn,
    });
  }

  async verify(token: string): Promise<JWTPayload> {
    return (await jwt.verify(
      token,
      process.env.JWT_SECRET as string
    )) as JWTPayload;
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
