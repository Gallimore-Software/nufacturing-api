import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

import { BomModule } from './bom/bom.module';
import { InfoModule } from './info/info.module';
import { IngredientsModule } from './ingredients/ingredients.module';
import { QuoteRoutingModule } from './quotes-routing.module';
import { QuotesComponent } from './quotes.component';

@NgModule({
  declarations: [QuotesComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    QuoteRoutingModule,
    IngredientsModule,
    InfoModule,
    FormsModule,
    BomModule,
    RouterModule,
  ],
})
export class QuotesModule {}
