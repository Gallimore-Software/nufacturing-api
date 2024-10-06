import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReportingRoutingModule } from './reporting-routing.module';
import { ReportingComponent } from './reporting.component';

@NgModule({
  declarations: [ReportingComponent],
  imports: [CommonModule, ReportingRoutingModule],
})
export class ReportingModule {}
