import { Vendor } from "@entities/vendor";

describe("Vendor Entity Tests", () => {
  it("should create a valid vendor entity", () => {
    const vendor = new Vendor({
      name: "Rice Suppliers Ltd.",
      contactEmail: "contact@ricesuppliers.com",
      productsSupplied: ["Brown Rice", "White Rice"],
    });

    expect(vendor.name).toBe("Rice Suppliers Ltd.");
    expect(vendor.productsSupplied.length).toBe(2);
  });

  it("should throw an error when adding an invalid product", () => {
    const vendor = new Vendor({
      name: "Grain Masters",
      contactEmail: "info@grainmasters.com",
      productsSupplied: ["Barley"],
    });

    expect(() => {
      vendor.addProduct("");
    }).toThrow("Product name cannot be empty");
  });

  it("should properly add a new product to the vendor", () => {
    const vendor = new Vendor({
      name: "Grain Masters",
      contactEmail: "info@grainmasters.com",
      productsSupplied: ["Barley"],
    });

    vendor.addProduct("Brown Rice");
    expect(vendor.productsSupplied).toContain("Brown Rice");
  });
});
