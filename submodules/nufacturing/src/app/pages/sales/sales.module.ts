import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import { OrdersNavigationComponent } from './components/orders-navigation/orders-navigation.component';
import { QuotesNavigationComponent } from './components/quotes-navigation/quotes-navigation.component';
import { SalesDashboardComponent } from './components/sales-dashboard/sales-dashboard.component';
import { SalesRoutingModule } from './sales-routing.module';
import { SalesComponent } from './sales.component';

@NgModule({
  declarations: [
    SalesComponent,
    SalesDashboardComponent,
    OrdersNavigationComponent,
    QuotesNavigationComponent,
  ],
  imports: [
    CommonModule,
    SalesRoutingModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatChipsModule,
  ],
})
export class SalesModule {}
