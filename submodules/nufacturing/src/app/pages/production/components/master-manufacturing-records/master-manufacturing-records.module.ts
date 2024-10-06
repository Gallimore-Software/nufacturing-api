import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MasterManifacturingRecordsRoutingModule } from './master-manifacturing-records-routing.module';
import { MasterManufacturingRecordsComponent } from './master-manufacturing-records.component';

@NgModule({
  declarations: [MasterManufacturingRecordsComponent],
  imports: [CommonModule, MasterManifacturingRecordsRoutingModule],
})
export class MasterManufacturingRecordsModule {}
