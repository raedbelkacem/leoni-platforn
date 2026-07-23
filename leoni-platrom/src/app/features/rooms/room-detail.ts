import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-room-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
<div class="room-detail" *ngIf="!loading && room">
  <div class="room-detail-header">
    <div>
      <a routerLink="/rooms">Back to Rooms</a>
      <h1>{{ room.code }} <span class="badge" [class]="room.alertLevel.toLowerCase()">{{ room.alertLevel }}</span></h1>
      <p>{{ room.name }} - {{ room.location }}</p>
    </div>
  </div>

  <div class="room-main-layout">
    <div class="chart-panel">
      <div class="chart-card">
        <h2>Live Sensor Snapshot</h2>
        <div class="sensor-grid-vertical">
          <div class="sensor-card" *ngFor="let sensor of sensors"
               [class.critical]="sensor.status === 'CRITICAL'"
               [class.warning]="sensor.status === 'WARNING'"
               [class.normal]="sensor.status === 'NORMAL'">
            <div class="sensor-type">{{ sensor.label }}</div>
            <div class="sensor-value">{{ sensor.value }}<span>{{ sensor.unit }}</span></div>
            <div class="sensor-status">{{ sensor.status }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="details-panel">
      <h2>Sensors</h2>
      <div class="sensor-grid-vertical">
        <div class="sensor-card" *ngFor="let sensor of sensors"
             [class.critical]="sensor.status === 'CRITICAL'"
             [class.warning]="sensor.status === 'WARNING'"
             [class.normal]="sensor.status === 'NORMAL'">
          <div class="sensor-type">{{ sensor.label }}</div>
          <div class="sensor-value">{{ sensor.value }}<span>{{ sensor.unit }}</span></div>
          <div class="sensor-status">{{ sensor.status }}</div>
        </div>
      </div>

      <div class="detail-card">
        <h2>Current Occupants</h2>
        <div class="occupant" *ngFor="let person of currentOccupants">
          <div class="occupant-avatar">{{ person.fullName[0] }}</div>
          <div>
            <div class="occupant-name">{{ person.fullName }}</div>
            <div class="occupant-role">{{ person.role }}</div>
          </div>
        </div>
        <p *ngIf="currentOccupants.length === 0">No one currently in this room.</p>
      </div>

      <div class="detail-card">
        <h2>Recent Incidents</h2>
        <div class="incident-row" *ngFor="let incident of recentIncidents"
             [class.open]="incident.status === 'OPEN'"
             [class.resolved]="incident.status === 'RESOLVED'">
          <div class="incident-title">{{ incident.title }}</div>
          <span class="incident-status">{{ incident.status }}</span>
        </div>
        <p *ngIf="recentIncidents.length === 0">No recent incidents.</p>
      </div>
    </div>
  </div>
</div>

<div *ngIf="loading" class="loading">Loading room data...</div>
<div *ngIf="!loading && !room" class="loading">Room not found.</div>
`
})
export class RoomDetailComponent implements OnInit, OnDestroy {
  roomId: string = '';
  room: any = null;
  sensors: any[] = [];
  currentOccupants: any[] = [];
  recentIncidents: any[] = [];
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.roomId = this.route.snapshot.paramMap.get('id') || '';
    this.loadRoom();
  }

  ngOnDestroy(): void {}

  loadRoom(): void {
    this.http.get<any>(`http://localhost:8080/api/rooms/${this.roomId}`).subscribe({
      next: (room) => {
        this.room = room;
        this.loading = false;
        this.loadDetails();
      },
      error: () => {
        this.room = null;
        this.loading = false;
      }
    });
  }

  loadDetails(): void {
    this.http.get<any[]>(`http://localhost:8080/api/rooms/${this.roomId}/sensors`).subscribe((sensors) => {
      this.sensors = sensors;
    });
    this.http.get<any[]>(`http://localhost:8080/api/rooms/${this.roomId}/incidents`).subscribe((incidents) => {
      this.recentIncidents = incidents;
    });
    this.currentOccupants = [
      { id: 'u1', fullName: 'Ahmed Ben Ali', role: 'TECHNICIAN' },
      { id: 'u2', fullName: 'Sarra Mansouri', role: 'MANAGER' },
    ];
  }
}
