import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { userInfo } from './model';

interface userCreationData {
    userName: string;
    email: string;
    password: string;
}

@Injectable({
  providedIn: "root"
})
export class DatabaseConnect {
  private getApiUrl = 'http://localhost:3000/api/users/get';
  private  createApiUrl = 'http://localhost:3000/api/users/create';

  http = inject(HttpClient);

  async getUsers(): Promise<Observable<userInfo[]>> {
    return this.http.get<userInfo[]>(this.getApiUrl).pipe(
      tap(users => console.log('Service: Fetched users successfully', users)),
      catchError((error) => {
        console.error('Service: Error fetching users', error);
        throw error;
      })
    );
  }

  createUser(user: userCreationData): Observable<userCreationData> {
    return this.http.post<userCreationData>(this.createApiUrl, user).pipe(
      tap((res) => console.log('Service: User created successfully', res)),
      catchError((err) => {
        console.error('Service: Error creating user', err);
        throw err;
      })
    );
  }
}
