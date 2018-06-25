import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';

//services
import { RedirectLoginService }from './service/redirect/redirect-login.service';
import { EnsureAuthenticationService } from './service/ensure-auth/ensure-authentication.service';

const appRoutes: Routes = [
  // {
  //   path: 'soluciones',
  //   children:[
  //     {
  //       path:'aimmonite',
  //       component: LoginComponent
  //     },
  //   ]
  // },

  {
    path: 'dashboard',
    canActivate:[EnsureAuthenticationService],
    component: DashboardComponent
  },
  {
    path: 'login',
    canActivate:[RedirectLoginService],
    component: LoginComponent
  }
  ,
  {
    path:'register',
    component: RegisterComponent
  },
  {
    path: '**',
    redirectTo: 'login'
    // component: NotFoundComponent
  }
];

export const AppRouting = RouterModule.forRoot(appRoutes, {
  useHash: false
});
