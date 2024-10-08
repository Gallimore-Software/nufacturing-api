// src/application/services/jwt-service.ts
import jwt from 'jsonwebtoken';

export class JWTService {
  verifyToken(token: string, secret: string): { id: string } {
    return jwt.verify(token, secret) as { id: string };
  }
}
