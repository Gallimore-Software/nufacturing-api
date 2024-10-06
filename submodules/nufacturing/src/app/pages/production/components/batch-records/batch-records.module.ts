import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { BatchDetailDialogComponent } from './batch-detail-dialog/batch-detail-dialog.component';
import { BatchRecordsRoutingModule } from './batch-records-routing.module';
import { BatchRecordsComponent } from './batch-records.component';
import { CreateBatchRecordsComponent } from './create-batch-records/create-batch-records.component';
import { ListBatchRecordsComponent } from './list-batch-records/list-batch-records.component';

@NgModule({
  declarations: [
    BatchRecordsComponent,
    ListBatchRecordsComponent,
    CreateBatchRecordsComponent,
    BatchDetailDialogComponent,
  ],
  imports: [
    CommonModule,
    BatchRecordsRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatSortModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatButtonModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
  ],
})
export class BatchRecordsModule {}
