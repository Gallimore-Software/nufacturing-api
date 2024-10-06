import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { CreateProductSkusComponent } from './create-product-skus/create-product-skus.component';
import { ListProductSkusComponent } from './list-product-skus/list-product-skus.component';
import { ProductSKUsRoutingModule } from './product-skus-routing.module';
import { ProductSkusComponent } from './product-skus.component';

@NgModule({
  declarations: [
    ProductSkusComponent,
    CreateProductSkusComponent,
    ListProductSkusComponent,
  ],
  imports: [
    CommonModule,
    ProductSKUsRoutingModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatSelectModule,
    MatAutocompleteModule,
  ],
})
export class ProductSkusModule {}
