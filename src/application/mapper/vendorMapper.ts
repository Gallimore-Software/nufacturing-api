import { VendorDTO } from "../dto/vendorDTO";

class VendorMapper {
  static fromDTO(dto: VendorDTO): Vendor {
    return new Vendor({
      name: dto.name,
      address: dto.address,
      phone: dto.phone,
    });
  }

  static toDTO(vendor: Vendor): VendorDTO {
    return {
      name: vendor.name,
      address: vendor.address,
      phone: vendor.phone,
    };
  }
}

export default VendorMapper;
