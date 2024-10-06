import { VendorEntity } from "@interfaces/dtos/vendorDTO";

import { VendorDocument, VendorDTO } from "../../interfaces/dtos/vendorDTO";

class VendorMapper {
  // Convert from DTO to Entity
  static fromDTO(dto: VendorDTO): VendorEntity {
    return new VendorEntity({
      _id: dto._id,
      displayName: dto.displayName,
      companyName: dto.companyName,
      companyWebsite: dto.companyWebsite,
      createdBy: dto.createdBy,
    });
  }

  // Convert from Entity to DTO
  static toDTO(vendor: VendorDocument): VendorDTO {
    return {
      _id: vendor._id as string | undefined,
      displayName: vendor.displayName,
      companyName: vendor.companyName,
      companyWebsite: vendor.companyWebsite,
      createdBy: vendor.createdBy,
    };
  }
}

export default VendorMapper;
