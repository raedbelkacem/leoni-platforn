/*signal → Angular 18's way of storing reactive state (we'll use it for currentUser)
HttpClient → Angular's built-in tool for making HTTP calls to the API
constructor(private http: HttpClient) → Angular automatically injects HttpClient into this service*/

import { Injectable,signal } from '@angular/core';
import {HttpClient} from '@angular/common/http';

/*tokenKey → the name we'll use to store the token in localStorage (browser storage)
signal<any>(null) → a reactive variable that starts as null (no user logged in yet). Any component that reads this will automatically update when it changes.*/

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly tokenKey = 'leoni_token';
  currentUser = signal<any>(null);
  constructor(private http:HttpClient) {}

  /*localStorage.getItem() → reads from browser storage, returns the token string or null if not found
!! → converts any value to a true boolean. If token exists → true, if null → false*/

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  setSession(response: any): void {
    localStorage.setItem(this.tokenKey, response.token);
    localStorage.setItem('leoni_user', JSON.stringify(response.user));
    this.currentUser.set(response.user);
  }

  loadUserFromStorage(): void {
    const storedUser = localStorage.getItem('leoni_user');
    if (storedUser && !this.currentUser()) {
      this.currentUser.set(JSON.parse(storedUser));
    }
  }

  /*localStorage.removeItem() → deletes the token from browser storage
this.currentUser.set(null) → resets the current user signal back to null (nobody logged in)*/

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem('leoni_user');
    this.currentUser.set(null);
  }

  /*this.http.post<any>() → sends a POST request to Spring Boot with email and password in the body
It returns an Observable — Angular's way of handling async operations (like waiting for an API response)
We don't subscribe here — the component that calls login() will handle the response*/

  login(email: string, password: string) {
    return this.http.post<any>('http://localhost:8080/api/auth/login', { email, password });
  }
}
