import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatPseudoCheckboxModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './components/auth/auth.guard';
import { AuthInterceptor } from './components/auth/auth.interceptor';
import { AuthService } from './components/auth/auth.service';
import { HasuraInterceptor } from './components/auth/hasura.interceptor';
import { CarouselComponent } from './components/carousel/carousel.component';
import { ContainerComponent } from './components/container/container.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { SyncStatusComponent } from './components/sync-status/sync-status.component';
import { SyncStatusService } from './components/sync-status/sync-status.service';
import { GraphQLModule } from './graphql.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DashboardModule } from './pages/dashboard/dashboard.module';
import { HumanResourcesModule } from './pages/human-resources/human-resources.module';
import { LogoutDialogComponent } from './pages/logout/logout-dialog/logout-dialog.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { ProductDevelopmentModule } from './pages/product-development/product-development.module';
import { ProductionModule } from './pages/production/production.module';
import { QualityModule } from './pages/quality/quality.module';
import { InfoModule } from './pages/sales/components/quotes/info/info.module';
import { IngredientsModule } from './pages/sales/components/quotes/ingredients/ingredients.module';
import { SalesModule } from './pages/sales/sales.module';
import { LoginComponent } from './pages/users/login/login.component';
import { RegisterComponent } from './pages/users/signup/register.component';

// Import the new SyncStatus components and services

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    ContainerComponent,
    LoginComponent,
    CarouselComponent,
    RegisterComponent,
    LogoutComponent,
    LogoutDialogComponent,
    // Add SyncStatusComponent
    SyncStatusComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatTooltipModule,
    MatButtonModule,
    MatFormFieldModule,
    MatTableModule, // Already imported for displaying the sync status
    ReactiveFormsModule,
    MatInputModule,
    IngredientsModule,
    SalesModule,
    InfoModule,
    MatCardModule,
    MatSelectModule,
    MatPseudoCheckboxModule,
    MatDialogModule,
    ProductDevelopmentModule,
    ProductionModule,
    DashboardModule,
    QualityModule,
    HumanResourcesModule,
    GraphQLModule,
    HttpClientModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
    SyncStatusService, // Add SyncStatusService here
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HasuraInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
