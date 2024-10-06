import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AssetsRoutingModule } from './assets.routing.module';
import { AssetDetailsComponent } from './components/asset-details/asset-details.component';
import { AssetFilesComponent } from './components/asset-files/asset-files.component';
import { AssetTrainingComponent } from './components/asset-training/asset-training.component';
import { PreventativeMaintenanceComponent } from './components/preventative-maintenance/preventative-maintenance.component';

@NgModule({
  declarations: [
    AssetDetailsComponent,
    AssetFilesComponent,
    AssetTrainingComponent,
    PreventativeMaintenanceComponent,
  ],
  imports: [CommonModule, AssetsRoutingModule],
})
export class AssetsModule {}
