import{Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {AuthService} from '../core/auth/auth.service';

@Component({
  selector:'app-navbar',
  standalone:true,
  imports:[CommonModule, RouterLink, RouterLinkActive],
  template:`
    <nav *ngIf="true">
      <div class="nav-logo">Leoni Platform</div>
      <div class="nav-links">
      <a routerLink ="/dashboard" routerLinkActive="active">Dashboard</a>
      <a routerLink="/rooms" routerLinkActive="active">Rooms</a>
      <a routerLink="/incidents" routerLinkActive="active">Incidents</a>
      <a routerLink="/notifications" routerLinkActive="active">Notifications</a>
      <a *ngIf="auth.currentUser()?.role === 'ADMIN' || auth.currentUser()?.role === 'MANAGER'"
         routerLink="/access-control" routerLinkActive="active">
        Access Control
      </a>
      <a *ngIf="auth.currentUser()?.role === 'ADMIN'"
         routerLink="/users" routerLinkActive="active">
        Users
      </a>
      </div>
      <div class="nav-right">
      <span>{{ auth.currentUser()?.fullName }}</span>
      <button (click)="auth.logout()">Logout</button>
      </div>
    </nav>
  `
})


export class NavbarComponent{

  constructor(public  auth:AuthService) {}
  /*Note public not private — because the template needs to access it directly.*/
  /* *ngIf="auth.isAuthenticated()" → navbar only shows when logged in
 routerLinkActive="active" → adds active CSS class to the current page link
 auth.currentUser()?.role → the ? safely handles the case where currentUser is null
 (click)="auth.logout()" → calls logout when button is clicked
 */
  /*
  selector → the HTML tag you'll use to place this component (<app-navbar>)
  standalone: true → no NgModule needed
  imports: [] → we'll add dependencies here
  template → the HTML, written directly in the TypeScript file using backticks
  CommonModule → for *ngIf in the template
  RouterLink and RouterLinkActive → for navigation links
  */
}
