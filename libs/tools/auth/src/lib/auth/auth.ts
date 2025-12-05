import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

interface AuthResponse {
  token?: string;
  user?: string;
  msg?: string
}

@Injectable({
  providedIn: "root"
})

export class AuthService {
  private apiUrl = 'https://dietician-app-node.onrender.com/api/auth';
  http = inject(HttpClient)
  private loggedSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedSubject.asObservable();

  login(credentials: any, requestName = 'login'): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/${requestName}`, credentials).pipe(
      tap( res => {
        if(res.token) {
          localStorage.setItem('auth_token', res.token);
          localStorage.setItem('UserName', res.user ?? '')
          this.loggedSubject.next(true)
        };
      }),

    )
  }

  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('UserName');
    this.loggedSubject.next(false);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  getLoggedInStatus(): boolean {
    return this.loggedSubject.getValue()
  }

  getUserName(): string| null {
    return localStorage.getItem('UserName');
  }
}
