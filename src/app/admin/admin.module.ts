import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import RoutingConstants from 'src/constants/routing-constants';
import { SearchPipe } from './../shared/pipes/search.pipe';
import { SharedModule } from './../shared/shared.module';
import { CreatePageComponent } from './pages/create-page/create-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { EditPageComponent } from './pages/edit-page/edit-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { AuthGuardService } from './shared/services/auth.guard';

const routes: Routes = [
  {
    path: RoutingConstants.ROOT,
    component: AdminLayoutComponent,
    children: [
      {
        path: RoutingConstants.ROOT,
        redirectTo: RoutingConstants.FULL_PATH_ADMIN_PAGE,
        pathMatch: RoutingConstants.FULL_PATH_MATCH
      },
      {
        path: RoutingConstants.ADMIN_LOGIN_PAGE,
        component: LoginPageComponent
      },
      {
        path: RoutingConstants.ADMIN_DASHBOARD_PAGE,
        component: DashboardPageComponent,
        canActivate: [ AuthGuardService ]
      },
      {
        path: RoutingConstants.ADMIN_CREATE_PAGE,
        component: CreatePageComponent,
        canActivate: [ AuthGuardService ]
      },
      {
        path: RoutingConstants.ADMIN_EDIT_PAGE,
        component: EditPageComponent,
        canActivate: [ AuthGuardService ]
      },
    ]
  }
];

@NgModule( {
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent,
    DashboardPageComponent,
    CreatePageComponent,
    EditPageComponent,
    SearchPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild( routes )
  ],
  exports: [ RouterModule ],
  providers: [ AuthGuardService ]
} )
export class AdminModule { }
