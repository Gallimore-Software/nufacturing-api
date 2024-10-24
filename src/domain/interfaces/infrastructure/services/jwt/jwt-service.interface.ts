export interface IJWTService {
  /**
   * Signs a JWT token with the given payload.
   * @param payload - The payload to encode into the JWT token.
   * @returns The signed JWT token.
   */
  sign(payload: object): object;

  /**
   * Verifies a JWT token.
   * @param token - The JWT token to verify.
   * @returns The decoded payload if the token is valid.
   * @throws An error if the token is invalid or expired.
   */
  verify(token: string): object;
}
