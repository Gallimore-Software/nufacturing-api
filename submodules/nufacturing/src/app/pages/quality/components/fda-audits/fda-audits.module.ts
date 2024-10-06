import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FdaAuditsRoutingModule } from './fda-audits-routing.module';
import { FdaAuditsComponent } from './fda-audits.component';

@NgModule({
  declarations: [FdaAuditsComponent],
  imports: [CommonModule, FdaAuditsRoutingModule],
})
export class FdaAuditsModule {}
