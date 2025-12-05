import { Route } from '@angular/router';
import { Home } from '@org/home';
import { WeightCalculator } from '@org/weightCalculator';
import { Login } from '@org/login';
import { Membership } from '@org/membership';
import { NewFeature } from '@org/tools/new-feature'
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
  {
    path: 'products',
    component: NewFeature,
    // canActivate: [AuthGuard]
  },
  {
    path: 'workouts',
    component: NewFeature
  },
  {
    path: 'membership',
    component: Membership
  },
  { path: 'login', component: Login },
];
