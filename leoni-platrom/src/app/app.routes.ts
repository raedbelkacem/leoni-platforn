import { Routes } from '@angular/router';
import { authGuard, roleGuard } from './core/auth/auth.guard';
export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./features/Home/home').then((m) => m.HomeComponent)
  },
  {
    path :'login',
    loadComponent: () =>
      import('./core/auth/login').then((m) => m.LoginComponent)
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/dashboard/dashboard').then((m) => m.DashboardComponent)
  },
  {
    path: 'rooms',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/rooms/room-list').then((m) => m.RoomListComponent)
  },
  {
    path: 'rooms/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/rooms/room-detail').then((m) => m.RoomDetailComponent)
  },
  {
    path: 'incidents',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/incidents/incident-list').then((m) => m.IncidentListComponent)
  },
  {
    path: 'notifications',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/notifications/notification-list').then((m) => m.NotificationListComponent)
  },
  {
    path: 'access-control',
    canActivate: [authGuard, roleGuard],
    data: { roles: ['ADMIN', 'MANAGER'] },
    loadComponent: () =>
      import('./features/access-control/access-control').then((m) => m.AccessControlComponent)
  },
  {
    path: 'users',
    canActivate: [authGuard, roleGuard],
    data: { roles: ['ADMIN'] },
    loadComponent: () =>
      import('./features/users/user-list').then((m) => m.UserListComponent)
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];
/*path → the URL segment (/login)
loadComponent → lazy loads the component only when the user navigates to that route
import() → dynamically imports the file only when needed (better performance)*/
