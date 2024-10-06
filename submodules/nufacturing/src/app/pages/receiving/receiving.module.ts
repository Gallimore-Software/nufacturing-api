import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReceivingRoutingModule } from './receiving-routing.module';
import { ReceivingComponent } from './receiving.component';

@NgModule({
  declarations: [ReceivingComponent],
  imports: [CommonModule, ReceivingRoutingModule],
})
export class ReceivingModule {}
