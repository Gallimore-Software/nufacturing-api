import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormulasModule } from './components/formulas/formulas.module';
import { ProductSkusModule } from './components/product-skus/product-skus.module';
import { ProductTypesComponent } from './components/product-types/product-types.component';
import { ResearchAndDevelopmentComponent } from './components/research-and-development/research-and-development.component';
import { ProductDevelopmentRoutingModule } from './product-development-routing.module';
import { ProductDevelopmentComponent } from './product-development.component';

@NgModule({
  declarations: [
    ProductDevelopmentComponent,
    ProductTypesComponent,
    ResearchAndDevelopmentComponent,
  ],
  imports: [
    CommonModule,
    ProductDevelopmentRoutingModule,
    FormulasModule,
    ProductSkusModule,
  ],
})
export class ProductDevelopmentModule {}
