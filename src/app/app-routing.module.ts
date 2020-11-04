import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import RoutingConstants from 'src/constants/routing-constants';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { PostPageComponent } from './pages/post-page/post-page.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: RoutingConstants.ROOT,
    component: MainLayoutComponent,
    children: [
      {
        path: RoutingConstants.ROOT,
        redirectTo: RoutingConstants.HOME_PAGE,
        pathMatch: RoutingConstants.FULL_PATH_MATCH
      },
      {
        path: RoutingConstants.ROOT,
        component: HomePageComponent
      },
      {
        path: RoutingConstants.CURRENT_POST_PAGE,
        component: PostPageComponent
      }
    ]
  },
  {
    path: RoutingConstants.ADMIN_ROUTE,
    loadChildren: () => import( './admin/admin.module' ).then( m => m.AdminModule )
  }
];

@NgModule( {
  imports: [ RouterModule.forRoot( routes, {
    preloadingStrategy: PreloadAllModules
  } ) ],
  exports: [ RouterModule ]
} )
export class AppRoutingModule { }
