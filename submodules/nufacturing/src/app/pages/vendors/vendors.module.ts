import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { VendorsRoutingModule } from './vendors-routing.module';
import { VendorsComponent } from './vendors.component';

@NgModule({
  declarations: [VendorsComponent],
  imports: [CommonModule, VendorsRoutingModule],
})
export class VendorsModule {}
