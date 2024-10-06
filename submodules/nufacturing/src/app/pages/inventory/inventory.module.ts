import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { InventoryItemDetailComponent } from './components/inventory-item-detail/inventory-item-detail.component';
import { InventoryItemsTableComponent } from './components/inventory-items-table/inventory-items-table.component';
import { NewInventoryDialogComponent } from './components/new-inventory-dialog/new-inventory-dialog.component';
import { InventoryRoutingModule } from './inventory-routing.module';
import { InventoryComponent } from './inventory.component';
import { InventoryService } from './inventory.service';

@NgModule({
  declarations: [
    InventoryComponent,
    InventoryItemsTableComponent,
    InventoryItemDetailComponent,
    NewInventoryDialogComponent,
  ],
  imports: [
    CommonModule,
    InventoryRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatOptionModule,
    MatDialogModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatSlideToggleModule,
    MatIconModule,
  ],
  providers: [InventoryService],
})
export class InventoryModule {}
