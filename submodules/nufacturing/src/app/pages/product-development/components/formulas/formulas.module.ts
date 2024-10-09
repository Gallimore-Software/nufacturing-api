import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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

import { CreateFormulasComponent } from './create-formulas/create-formulas.component';
import { FormulasRoutingModule } from './formulas-routing.module';
import { FormulasComponent } from './formulas.component';
import { ListFormulaComponent } from './list-formulas/list-formulas.component';
import { ConfirmDialogComponent } from '../../../../components/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    FormulasComponent,
    CreateFormulasComponent,
    ListFormulaComponent,
    ConfirmDialogComponent,
  ],
  imports: [
    CommonModule,
    FormulasRoutingModule,
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
  ],
})
export class FormulasModule {}
