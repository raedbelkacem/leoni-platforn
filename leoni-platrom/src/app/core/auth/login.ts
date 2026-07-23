import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-container">
      <div class="login-card">
        <h1>Leoni Platform</h1>
        <h2>Sign in</h2>

        <div>
          <label>Email</label>
          <input
            type="email"
            [(ngModel)]="email"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            [(ngModel)]="password"
            placeholder="Enter your password"
          />
        </div>

        <p *ngIf="errorMessage">{{ errorMessage }}</p>

        <button (click)="submit()" [disabled]="loading">
          {{ loading ? 'Signing in...' : 'Sign in' }}
        </button>
      </div>
    </div>
  `
})
export class LoginComponent {

  // form field values — bound to inputs via [(ngModel)]
  email = '';
  password = '';

  // shown when API returns an error
  errorMessage = '';

  // disables the button while the API call is in progress
  loading = false;

  // AuthService → handles login logic and token storage
  // Router → navigates to /dashboard after successful login
  constructor(private auth: AuthService, private router: Router) {}

  submit(): void {
    this.loading = true;
    this.errorMessage = '';

    // .subscribe() listens to the Observable returned by auth.login()
    this.auth.login(this.email, this.password).subscribe({

      // next → called when API responds successfully
      next: (res) => {
        this.auth.setSession(res);
        // redirect to dashboard
        this.router.navigate(['/dashboard']);
      },

      // error → called when login fails (wrong credentials, server down)
      error: () => {
        this.errorMessage = 'Invalid email or password.';
        this.loading = false;
      }
    });
  }

}
