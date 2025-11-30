import { Route } from '@angular/router';
import { Home } from '@org/home';
import { WeightCalculator } from '@org/weightCalculator';
import { Login } from '@org/login';
import { AuthGuard } from './auth-guard-guard';

export const appRoutes: Route[] = [
  {
    path: 'overview',
    component: Home
  },
  {
    path: '',
    redirectTo: '/overview',
    pathMatch: 'full',
  },
  {
    path: 'weightCalculator',
    component: WeightCalculator,
    canActivate: [AuthGuard]
  },
  { path: 'login', component: Login },
];
