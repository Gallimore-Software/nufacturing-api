// src/app/services/jwt-service/jwt-payload.interface.ts

export interface JWTPayload {
  id: string;
  role: string; // This is the role we expect from the token
  email?: string; // Example additional field
  // You can add more fields depending on the structure of your JWT
}
