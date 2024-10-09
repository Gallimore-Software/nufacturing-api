import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { VendorsService, Vendor } from 'src/app/services/vendors.service'; // Adjust the path as needed
import { InventoryService } from '../../inventory.service';

@Component({
  selector: 'app-new-inventory-dialog',
  templateUrl: './new-inventory-dialog.component.html',
  styleUrls: ['./new-inventory-dialog.component.scss'],
})
export class NewInventoryDialogComponent implements OnInit {
  inventoryForm: FormGroup;
  isSubmitting: boolean = false;
  filteredVendors: Vendor[] = [];
  selectedVendorDisplayName: string = '';


  constructor(
    private dialogRef: MatDialogRef<NewInventoryDialogComponent>,
    private fb: FormBuilder,
    private vendorService: VendorsService,
    private inventoryService: InventoryService,

    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.inventoryForm = this.fb.group({
      vendor: ['', Validators.required],
      displayName: ['', Validators.required],
      sku: ['', Validators.required],
      description: ['', Validators.required],
      inventoryCategory: ['', Validators.required],
      type: ['', Validators.required],
      lotCode: ['', Validators.required],
      unitOfMeasurement: ['', Validators.required],
      pricePerUnit: ['', Validators.required],
      quantities: this.fb.group({
        minRestockQuantity: [0, Validators.required],
        inStock: [0, Validators.required],
      }),
      availableQuantity: [0, Validators.required],
      onHoldQuantity: [0, Validators.required],
      quarantinedQuantity: [0, Validators.required],
      createdBy: [this.data.userId],
    });
  }

  ngOnInit() {
    // If the data has an inventory item, populate the form for editing
    if (this.data._id) {
      this.populateForm();
    } else {
      console.log('No Data');
    }

    // Subscribe to the vendor input value changes
    console.log('Value Change');
    this.inventoryForm
      .get('vendor')
      ?.valueChanges.pipe(
        debounceTime(300),
        switchMap((searchTerm) => {
          if (searchTerm) {
            return this.vendorService.getVendors().pipe(
              switchMap((response) => {
                if (response) {
                  console.log(response);
                  // Filter vendors based on the search term
                  return of(
                    response.filter((vendor) =>
                      vendor.displayName
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()),
                    ),
                  );
                } else {
                  console.log('No Vendor Data: ' + JSON.stringify(response));
                }
                return of([]);
              }),
            );
          } else {
            return of([]);
          }
        }),
      )
      .subscribe((filteredVendors: Vendor[]) => {
        this.filteredVendors = filteredVendors;
      });
  }

  onVendorSelected(vendor: any): void {
    this.inventoryForm.patchValue({ vendor: vendor._id }); // Set the vendor ID in the form control
    this.selectedVendorDisplayName = vendor.displayName; // Set the display name
  }


  private populateForm() {
      if (this.data) {
        console.log(this.data.createdBy)
          this.inventoryForm.patchValue({
              vendor: this.data.vendor._id, // Setting vendor from createdBy
              displayName: this.data.displayName,
              sku: this.data.sku,
              description: this.data.description,
              inventoryCategory: this.data.inventoryCategory,
              type: this.data.type,
              lotCode: this.data.lotCode,
              unitOfMeasurement: this.data.unitOfMeasurement,
              pricePerUnit: this.data.pricePerUnit,
              createdBy: {
                createdAt: this.data.createdBy.createdAt,
                email: this.data.createdBy.email,
                emailVerified: this.data.createdBy.emailVerified,
                password: this.data.createdBy.password,
                phoneNumber: this.data.createdBy.phoneNumber,
                role: this.data.createdBy.role,
                _v: this.data.createdBy._v,
                _id: this.data.createdBy._id,
              },
              quantities: {
                  inStock: this.data.quantities.inStock,
                  minRestockQuantity: this.data.quantities.minRestockQuantity,
                  availableQuantity: this.data.quantities.availableQuantity,
                  onHoldQuantity: this.data.quantities.onHoldQuantity,
                  quarantinedQuantity: this.data.quantities.quarantinedQuantity,
              },
          });
      }
  }

  onSubmit(event: Event): void {
    event.preventDefault();

    if (this.inventoryForm.valid) {
      this.isSubmitting = true;
      const inventoryData = this.inventoryForm.value;

      // Check if we are editing or creating a new item
      if (this.data && this.data._id) {

        this.inventoryService.updateInventoryItem( this.data._id, inventoryData).subscribe(
          (response) => {
            if (response.success) {
              console.log('Inventory item updated:', response.data);
              this.isSubmitting = false;
              this.dialogRef.close(response.data);
            } else {
              console.error('Failed to update inventory item.');
              this.isSubmitting = false;
            }
          },
          (error) => {
            console.error('Error updating inventory item:', error);
            this.isSubmitting = false;
          }
        );
      } else {
        // Create new inventory item
        console.log('New Inventory Item:', inventoryData);

        this.inventoryService.addInventoryItem(inventoryData).subscribe(
          (response) => {
            if (response.success) {
              console.log('Inventory item created:', response.data);
              this.isSubmitting = false;
              this.dialogRef.close(response.data);
            } else {
              console.error('Failed to create inventory item.');
              this.isSubmitting = false;
            }
          },
          (error) => {
            console.error('Error creating inventory item:', error);
            this.isSubmitting = false;
          }
        );
      }
    } else {
      console.log('Error while saving');
      this.inventoryForm.markAllAsTouched(); // Highlight all invalid fields
      return;
    }
  }


  onCancel() {
    this.dialogRef.close();
  }
}
