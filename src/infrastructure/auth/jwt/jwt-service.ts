import jwt, { JwtPayload } from 'jsonwebtoken'; // Import only the available exports
import { IJWTService } from '@domain/interfaces/infrastructure/services/jwt/jwt-service.interface';
import { injectable } from 'inversify';
import { JWTPayload } from '@domain/interfaces/infrastructure/services/jwt/jwt-payload.interface';

@injectable()
export class JWTService implements IJWTService {
  // Sign an access token with a default expiration of 1 hour
  sign(
    payload: JWTPayload,
    expiresIn: string = '1h'
  ): { accessToken: string; expiresAt: Date } {
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn,
    });

    // Decode the token to get the expiration timestamp
    const decoded = jwt.decode(accessToken) as JwtPayload;

    // Convert the expiration to a Date object
    const expiresAt = new Date((decoded.exp || 0) * 1000);

    return { accessToken, expiresAt }; // Return both token and expiration date
  }

  // Verify an access token and return its payload
  async verify(token: string): Promise<JWTPayload | null> {
    try {
      return jwt.verify(token, process.env.JWT_SECRET as string) as JWTPayload;
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        console.error('Invalid JWT Token:', error.message);
      }
      return null; // Return null if verification fails
    }
  }

  // Sign a refresh token with a longer expiration (e.g., 7 days)
  signRefreshToken(payload: { id: string }): string {
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET as string, {
      expiresIn: '7d', // Refresh token expiration
    });
  }

  // Verify a refresh token and return its payload
  verifyRefreshToken(token: string): JwtPayload | null {
    try {
      return jwt.verify(
        token,
        process.env.JWT_REFRESH_SECRET as string
      ) as JwtPayload;
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        console.error('Invalid Refresh Token:', error.message);
      }
      return null; // Return null if verification fails
    }
  }
}
