"use strict";
// src/domain/entities/Vendor.ts
Object.defineProperty(exports, "__esModule", { value: true });
class Vendor {
    constructor(vendorProps) {
        this.id = vendorProps.id;
        this.name = vendorProps.name;
        this.address = vendorProps.address;
        this.phoneNumber = vendorProps.phoneNumber;
        this.email = vendorProps.email;
        this.contactPerson = vendorProps.contactPerson;
        this.isVerified = vendorProps.isVerified;
    }
    // Getters
    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getAddress() {
        return this.address;
    }
    getPhoneNumber() {
        return this.phoneNumber;
    }
    getEmail() {
        return this.email;
    }
    getContactPerson() {
        return this.contactPerson;
    }
    getIsVerified() {
        return this.isVerified;
    }
    // Setters with domain logic
    updateContactPerson(newContactPerson) {
        if (!newContactPerson) {
            throw new Error("Contact person cannot be empty");
        }
        this.contactPerson = newContactPerson;
    }
    updateAddress(newAddress) {
        if (!newAddress) {
            throw new Error("Address cannot be empty");
        }
        this.address = newAddress;
    }
    verifyVendor() {
        this.isVerified = true;
    }
    unverifyVendor() {
        this.isVerified = false;
    }
}
exports.default = Vendor;
