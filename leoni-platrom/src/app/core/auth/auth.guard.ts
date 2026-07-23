import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  auth.loadUserFromStorage();

  if (auth.isAuthenticated()) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};

export const roleGuard: CanActivateFn = (route) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const allowedRoles = route.data?.['roles'] as string[];
  auth.loadUserFromStorage();

  if (!allowedRoles || auth.currentUser()?.role && allowedRoles.includes(auth.currentUser()?.role)) {
    return true;
  }

  router.navigate(['/dashboard']);
  return false;
};
