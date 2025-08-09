export interface JWTPayload {
  id: string;
  role: string; // This is the role we expect from the token
  email?: string; // Example additional field
}
