import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TrainingModule } from './components/training/training.module';
import { UsersModule } from './components/users/users.module';
import { HumanResourcesRoutingModule } from './human-resources-routing.module';
import { HumanResourcesComponent } from './human-resources.component';

@NgModule({
  declarations: [HumanResourcesComponent],
  imports: [
    CommonModule,
    HumanResourcesRoutingModule,
    TrainingModule,
    UsersModule,
  ],
})
export class HumanResourcesModule {}
