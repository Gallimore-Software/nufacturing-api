// src/application/interfaces/jwt-service.interface.ts
export interface IJWTService {
  generateToken(payload: object, secret: string, expiresIn: string): string;
  verifyToken(token: string, secret: string): any;
  decodeToken(token: string): any;
}
