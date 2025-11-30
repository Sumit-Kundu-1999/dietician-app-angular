import { AsyncPipe } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '@org/auth'
import { Observable } from 'rxjs';

@Component({
  selector: 'lib-header',
  imports: [RouterModule, AsyncPipe],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit {
  isLoggedIn$ = new Observable<boolean>()
  isLoggedIn = signal(false);
  redirectToLogin = signal(false);
  userName = signal('');
  isDropdownOpen = signal(false);
  activeView = signal('overview');
  authService = inject(AuthService)
  router = inject(Router);
  
  navItems = [
    { label: 'Home', view: 'overview' },
    { label: 'Workouts', view: 'workouts' },
    { label: 'Weight Calculator', view: 'weightCalculator' },
    { label: 'Programs', view: 'programs' },
    { label: 'Membership', view: 'membership' },
  ];

  activeViewTitle = computed(() => {
    const active = this.activeView();
    const item = this.navItems.find(i => i.view === active);
    return item ? item.label : 'Welcome';
  });

  logout() {
    this.isLoggedIn.set(false);
    this.isDropdownOpen.set(false); // Close dropdown on logout
    this.userName.set('');
    this.authService.logout();
    console.log('User logged out.');
  }

  ngOnInit(): void {

    //Login User general
    const loggedInStatus = this.authService.isLoggedIn();
    this.authService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn.set(status);
      const userName = this.authService.getUserName();
      this.userName.set(userName ?? 'User');
    });

    // Login User After reftresh page
    if(loggedInStatus) {
      this.isLoggedIn.set(loggedInStatus);
      this.isLoggedIn$ = this.authService.isLoggedIn$;
      this.isLoggedIn$.subscribe(() => {
        const userName = this.authService.getUserName();
        this.userName.set(userName ?? 'User'); 
      });
    }
  }

  toggleDropdown() {
    this.isDropdownOpen.update(current => !current);
  }

  setView(view: string) {
    this.activeView.set(view);
  }
}
