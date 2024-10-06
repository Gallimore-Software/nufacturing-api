import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { IngredientsInfoComponent } from './ingredients-info/ingredients-info.component';
import { IngredientsRoutingModule } from './ingredients-routing.module';
import { IngredientsComponent } from './ingredients.component';
import { SupplementFactsDetailsComponent } from './supplement-facts-details/supplement-facts-details.component';
import { supplementFactsOnlyComponent } from './supplement-facts-only/supplement-facts-only.component';

@NgModule({
  declarations: [
    IngredientsInfoComponent,
    IngredientsComponent,
    SupplementFactsDetailsComponent,
    supplementFactsOnlyComponent,
  ],
  imports: [
    CommonModule,
    IngredientsRoutingModule,
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
  ],
})
export class IngredientsModule {}
