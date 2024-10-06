import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FdaAuditsModule } from './components/fda-audits/fda-audits.module';
import { QualityAuditsModule } from './components/quality-audits/quality-audits.module';
import { QualityRoutingModule } from './quality-routing.module';
import { QualityComponent } from './quality.component';

@NgModule({
  declarations: [QualityComponent],
  imports: [
    CommonModule,
    FdaAuditsModule,
    QualityAuditsModule,
    QualityRoutingModule,
  ],
})
export class QualityModule {}
