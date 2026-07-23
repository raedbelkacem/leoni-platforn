import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="dashboard">

      <div class="dashboard-header">
        <div>
          <h1>Welcome, {{ auth.currentUser()?.fullName || 'User' }}</h1>
          <p>{{ auth.currentUser()?.role }} — Leoni Server Rooms Platform</p>
        </div>
        <span class="role-badge">{{ auth.currentUser()?.role }}</span>
      </div>

      <div class="stats-row">
        <div class="stat-card">
          <h3>{{ rooms.length }}</h3>
          <p>Total Rooms</p>
        </div>
        <div class="stat-card critical">
          <h3>{{ criticalCount }}</h3>
          <p>Critical</p>
        </div>
        <div class="stat-card warning">
          <h3>{{ warningCount }}</h3>
          <p>Warning</p>
        </div>
        <div class="stat-card normal">
          <h3>{{ normalCount }}</h3>
          <p>Normal</p>
        </div>
      </div>

      <h2>Server Rooms</h2>
      <div class="rooms-grid">
        <a class="room-card"
           *ngFor="let room of rooms"
           [routerLink]="['/rooms', room.id]"
           [class.critical]="room.alertLevel === 'CRITICAL'"
           [class.warning]="room.alertLevel === 'WARNING'"
           [class.normal]="room.alertLevel === 'NORMAL'">
          <div class="room-code">{{ room.code }}</div>
          <div class="room-name">{{ room.name }}</div>
          <div class="room-location">{{ room.location }}</div>
          <span class="alert-badge">{{ room.alertLevel }}</span>
        </a>
      </div>

    </div>
  `
})
export class DashboardComponent implements OnInit {
  rooms: any[] = [];

  get criticalCount() { return this.rooms.filter(r => r.alertLevel === 'CRITICAL').length; }
  get warningCount()  { return this.rooms.filter(r => r.alertLevel === 'WARNING').length; }
  get normalCount()   { return this.rooms.filter(r => r.alertLevel === 'NORMAL').length; }

  constructor(public auth: AuthService, private http: HttpClient) {}

  ngOnInit(): void {
    this.auth.loadUserFromStorage();
    this.http.get<any[]>('http://localhost:8080/api/rooms').subscribe((rooms) => {
      this.rooms = rooms;
    });
  }
}
