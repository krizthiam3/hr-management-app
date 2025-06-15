import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginResponse } from 'src/app/auth/models/response';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'https://localhost:5001/api/auth';

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { username: string; password: string }) {
        return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials);

  }

  saveToken(token: string) {
    localStorage.setItem('jwt', token);
  }

  logout() {
    localStorage.removeItem('jwt');
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
