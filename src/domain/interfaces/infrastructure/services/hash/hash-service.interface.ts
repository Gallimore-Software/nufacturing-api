export interface IHashService {
  /**
   * Compares a plain text password with a hashed password.
   * @param plainText - The plain text password.
   * @param hashed - The hashed password.
   * @returns A promise that resolves to true if the passwords match, otherwise false.
   */
  compare(plainText: string, hashed: string): Promise<boolean>;

  /**
   * Hashes a plain text password.
   * @param plainText - The plain text password.
   * @returns A promise that resolves to the hashed password.
   */
  hash(plainText: string): Promise<string>;
}
