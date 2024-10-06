import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list'; // Add this import
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';

import { AccountInfoComponent } from './account-info/account-info.component';
import { BottleInfoComponent } from './bottle-info/bottle-info.component';
import { CapsuleInfoComponent } from './capsule-info/capsule-info.component';
import { ClosureInfoComponent } from './closure-info/closure-info.component';
import { CustomerInfoComponent } from './customer-info/customer-info.component';
import { InfoRoutingModule } from './info-routing.module';
import { InfoComponent } from './info.component';
import { LabelInfoComponent } from './label-info/label-info.component';
import { MasterCartonInfoComponent } from './master-carton-info/master-carton-info.component';
import { OrderCostsComponent } from './order-costs/order-costs.component';
import { OrderInfoComponent } from './order-info/order-info.component';
import { OtherComponentsComponent } from './other-components/other-components.component';
import { TestingInfoComponent } from './testing-info/testing-info.component';

@NgModule({
  declarations: [
    InfoComponent,
    AccountInfoComponent,
    CustomerInfoComponent,
    OrderInfoComponent,
    TestingInfoComponent,
    OrderCostsComponent,
    CapsuleInfoComponent,
    BottleInfoComponent,
    ClosureInfoComponent,
    MasterCartonInfoComponent,
    OtherComponentsComponent,
    LabelInfoComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSelectModule,
    MatListModule,
    MatIconModule,
    FlexLayoutModule,
    InfoRoutingModule,
  ],
})
export class InfoModule {}
