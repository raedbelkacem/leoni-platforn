import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-incident-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
  <div class="incidents-page">

  <!-- Header -->
  <div class="page-header">
    <h1>Incidents</h1>
    <span class="total-badge">{{ incidents.length }} total</span>
  </div>

  <!-- Filters -->
  <div class="filter-bar">
    <button
      *ngFor="let filter of filters"
      (click)="setFilter(filter)"
      [class.active]="activeFilter === filter"
      class="filter-btn">
      {{ filter }}
    </button>
  </div>

  <!-- Incidents Table -->
  <div class="incidents-table">

    <div class="table-header">
      <span>Title</span>
      <span>Room</span>
      <span>Source</span>
      <span>Assigned To</span>
      <span>Date</span>
      <span>Status</span>
    </div>

    <div class="table-row" *ngFor="let incident of filteredIncidents"
         [class.open]="incident.status === 'OPEN'"
         [class.in-progress]="incident.status === 'IN_PROGRESS'"
         [class.blocked]="incident.status === 'BLOCKED'"
         [class.resolved]="incident.status === 'RESOLVED'">
      <a
        class="incident-title"
        [routerLink]="['/incidents', incident.id]">
        {{ incident.title }}
      </a>
      <span class="room-tag">{{ incident.roomCode }}</span>
      <span class="source-tag">{{ incident.source }}</span>
      <span>{{ incident.assignedTo }}</span>
      <span class="date">{{ incident.createdAt | date:'dd/MM/yyyy HH:mm' }}</span>
      <span class="status-tag">{{ incident.status }}</span>
    </div>

    <div class="no-results" *ngIf="filteredIncidents.length === 0">
      No incidents found for this filter.
    </div>

  </div>

</div>
  `
})
export class IncidentListComponent implements OnInit {

  incidents: any[] = [];
  filteredIncidents: any[] = [];
  activeFilter: string = 'ALL';
  filters = ['ALL', 'OPEN', 'IN_PROGRESS', 'BLOCKED', 'RESOLVED'];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:8080/api/incidents').subscribe((incidents) => {
      this.incidents = incidents;
      this.applyFilter();
    });
  }

  // filter incidents by status
  setFilter(filter: string): void {
    this.activeFilter = filter;
    this.applyFilter();
  }

  applyFilter(): void {
    this.filteredIncidents = this.activeFilter === 'ALL'
      ? this.incidents
      : this.incidents.filter(i => i.status === this.activeFilter);
  }

}
