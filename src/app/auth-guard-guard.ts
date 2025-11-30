import { inject, Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '@org/auth'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})

export class AuthGuard implements CanActivate {
  
  authService = inject(AuthService);
  router = inject(Router);

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.authService.isLoggedIn()) {
        return true;
      }
      return this.router.createUrlTree(['/login']);
  }
};
