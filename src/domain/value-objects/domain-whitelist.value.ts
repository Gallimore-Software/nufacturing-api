export class DomainWhitelist {
  private readonly allowedDomains: Set<string>;

  constructor(domains: string[]) {
    if (domains.length === 0) {
      throw new Error('Domain whitelist cannot be empty.');
    }

    this.allowedDomains = new Set(
      domains.map((domain) => domain.toLowerCase())
    );
  }

  public isAllowedDomain(domain: string): boolean {
    return this.allowedDomains.has(domain.toLowerCase());
  }

  public getAllowedDomains(): string[] {
    return Array.from(this.allowedDomains);
  }
}
