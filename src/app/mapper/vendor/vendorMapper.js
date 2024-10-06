"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vendorDTO_1 = require("@interfaces/dtos/vendorDTO");
class VendorMapper {
    // Convert from DTO to Entity
    static fromDTO(dto) {
        return new vendorDTO_1.VendorEntity({
            _id: dto._id,
            displayName: dto.displayName,
            companyName: dto.companyName,
            companyWebsite: dto.companyWebsite,
            createdBy: dto.createdBy,
        });
    }
    // Convert from Entity to DTO
    static toDTO(vendor) {
        return {
            _id: vendor._id,
            displayName: vendor.displayName,
            companyName: vendor.companyName,
            companyWebsite: vendor.companyWebsite,
            createdBy: vendor.createdBy,
        };
    }
}
exports.default = VendorMapper;
