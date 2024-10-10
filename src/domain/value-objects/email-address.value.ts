import { DomainWhitelist } from '@domain/value-objects/domain-whitelist.value';

export class EmailAddress {
  private readonly value: string;

  constructor(value: string, domainWhitelist: DomainWhitelist) {
    if (!this.validateEmail(value, domainWhitelist)) {
      throw new Error(`Invalid or unauthorized email address: ${value}`);
    }
    this.value = value;
  }

  private validateEmail(
    email: string,
    domainWhitelist: DomainWhitelist
  ): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return false;

    const emailDomain = email.split('@')[1];
    return domainWhitelist.isAllowedDomain(emailDomain);
  }

  public getValue(): string {
    return this.value;
  }

  public equals(other: EmailAddress): boolean {
    return this.value.toLowerCase() === other.getValue().toLowerCase();
  }
}
