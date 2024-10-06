import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { QualityAuditsRoutingModule } from './quality-audits-routing.module';
import { QualityAuditsComponent } from './quality-audits.component';

@NgModule({
  declarations: [QualityAuditsComponent],
  imports: [CommonModule, QualityAuditsRoutingModule],
})
export class QualityAuditsModule {}
