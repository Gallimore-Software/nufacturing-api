// src/domain/entities/Vendor.ts

export interface IVendor {
  id: string;
  name: string;
  address: string;
  phoneNumber: string;
  email: string;
  contactPerson: string;
  isVerified: boolean;
}

export default class Vendor {
  private id: string;
  private name: string;
  private address: string;
  private phoneNumber: string;
  private email: string;
  private contactPerson: string;
  private isVerified: boolean;

  constructor(vendorProps: IVendor) {
    this.id = vendorProps.id;
    this.name = vendorProps.name;
    this.address = vendorProps.address;
    this.phoneNumber = vendorProps.phoneNumber;
    this.email = vendorProps.email;
    this.contactPerson = vendorProps.contactPerson;
    this.isVerified = vendorProps.isVerified;
  }

  // Getters
  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getAddress(): string {
    return this.address;
  }

  public getPhoneNumber(): string {
    return this.phoneNumber;
  }

  public getEmail(): string {
    return this.email;
  }

  public getContactPerson(): string {
    return this.contactPerson;
  }

  public getIsVerified(): boolean {
    return this.isVerified;
  }

  // Setters with domain logic
  public updateContactPerson(newContactPerson: string): void {
    if (!newContactPerson) {
      throw new Error("Contact person cannot be empty");
    }
    this.contactPerson = newContactPerson;
  }

  public updateAddress(newAddress: string): void {
    if (!newAddress) {
      throw new Error("Address cannot be empty");
    }
    this.address = newAddress;
  }

  public verifyVendor(): void {
    this.isVerified = true;
  }

  public unverifyVendor(): void {
    this.isVerified = false;
  }
}
