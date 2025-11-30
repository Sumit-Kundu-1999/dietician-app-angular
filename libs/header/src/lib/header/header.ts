import { AsyncPipe } from '@angular/common';
import { Component, computed, ElementRef, HostListener, inject, OnInit, signal, ViewChild } from '@angular/core';
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
  @ViewChild('navbarContainer', { static: true }) navbarContainer!: ElementRef;
  
  isLoggedIn$ = new Observable<boolean>()
  isLoggedIn = signal(false);
  redirectToLogin = signal(false);
  userName = signal('');
  isDropdownOpen = signal(false);
  activeView = signal('overview');

  // property to manually track the collapse state for mobile (optional, but helpful)
  isCollapsed = signal(true);

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

  toggleCollapse() {
    // This is primarily handled by Bootstrap's JS when the Toggler button is clicked, 
    // but we can set a signal if we need to manually close it later.
    this.isCollapsed.update(value => !value);
  }

  setView(view: string) {
    this.activeView.set(view);
  }

  closeMenus() {
    this.isDropdownOpen.set(false);
    
    // Manually trigger the collapse close if it's currently open (optional)
    // Note: If you rely purely on Bootstrap JS, this part might need direct DOM manipulation or
    // a Bootstrap utility service if your project uses one. For now, we'll try the DOM method.
    const navbar = this.navbarContainer.nativeElement.querySelector('#navbarNav');
    if (navbar && navbar.classList.contains('show')) {
        const bsCollapse = new (window as any).bootstrap.Collapse(navbar, { toggle: false });
        bsCollapse.hide();
    }
  }

  // HostListener to detect clicks anywhere on the document
  @HostListener('document:click', ['$event'])
  clickout(event: MouseEvent) {
    const target = event.target as HTMLElement;

    // 1. Check if the click is outside the entire navbar component
    if (this.navbarContainer && !this.navbarContainer.nativeElement.contains(target)) {
      this.closeMenus();
    } 
    // 2. Special case: If the dropdown is open and the user clicks the Toggler button, 
    // the dropdown must close, but the navbar stays open (handled in closeMenus)
    // This check is often not strictly needed if the general check above works well, 
    // but it ensures the dropdown closes if the mobile menu button is pressed.
    else if (target.closest('.navbar-toggler')) {
        // If the toggler is clicked, we ensure the dropdown closes immediately.
        this.isDropdownOpen.set(false);
    }
  }
}
