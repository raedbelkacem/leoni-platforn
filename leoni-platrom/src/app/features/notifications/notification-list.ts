import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-notification-list',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="notifications-page">

  <div class="page-header">
    <h1>Notifications</h1>
    <div class="header-actions">
      <span class="total-badge" *ngIf="unreadCount > 0">{{ unreadCount }} unread</span>
      <button class="mark-all-btn" (click)="markAllAsRead()">Mark all as read</button>
    </div>
  </div>

  <div class="filter-bar">
    <button
      *ngFor="let filter of filters"
      (click)="setFilter(filter)"
      [class.active]="activeFilter === filter"
      class="filter-btn">
      {{ filter }}
    </button>
  </div>

  <div class="notifications-list">
    <div class="notification-card"
         *ngFor="let notif of filteredNotifications"
         [class.unread]="!notif.read"
         [class.critical]="notif.level === 'CRITICAL'"
         [class.warning]="notif.level === 'WARNING'"
         [class.info]="notif.level === 'INFO'"
         (click)="markAsRead(notif)">

      <div class="notif-icon">
        <span *ngIf="notif.level === 'CRITICAL'">!</span>
        <span *ngIf="notif.level === 'WARNING'">!</span>
        <span *ngIf="notif.level === 'INFO'">i</span>
      </div>

      <div class="notif-content">
        <div class="notif-header">
          <span class="notif-title">{{ notif.title }}</span>
          <span class="notif-room">{{ notif.relatedRoomId }}</span>
        </div>
        <p class="notif-message">{{ notif.message }}</p>
        <span class="notif-date">{{ notif.createdAt | date:'dd/MM/yyyy HH:mm' }}</span>
      </div>

      <div class="notif-status">
        <span class="unread-dot" *ngIf="!notif.read"></span>
        <span class="level-badge">{{ notif.level }}</span>
      </div>

    </div>

    <div class="no-results" *ngIf="filteredNotifications.length === 0">
      No notifications found.
    </div>

  </div>

</div>
  `
})
export class NotificationListComponent implements OnInit {

  notifications: any[] = [];
  filteredNotifications: any[] = [];
  activeFilter: string = 'ALL';
  filters = ['ALL', 'UNREAD', 'INFO', 'WARNING', 'CRITICAL'];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:8080/api/notifications').subscribe((notifications) => {
      this.notifications = notifications;
      this.applyFilter();
    });
  }

  setFilter(filter: string): void {
    this.activeFilter = filter;
    this.applyFilter();
  }

  applyFilter(): void {
    if (this.activeFilter === 'ALL') {
      this.filteredNotifications = this.notifications;
    } else if (this.activeFilter === 'UNREAD') {
      this.filteredNotifications = this.notifications.filter(n => !n.read);
    } else {
      this.filteredNotifications = this.notifications.filter(n => n.level === this.activeFilter);
    }
  }

  markAsRead(notification: any): void {
    if (notification.read) {
      return;
    }
    this.http.patch<any>(`http://localhost:8080/api/notifications/${notification.id}/read`, {}).subscribe((updated) => {
      notification.read = updated.read;
      this.applyFilter();
    });
  }

  markAllAsRead(): void {
    this.http.patch<any[]>('http://localhost:8080/api/notifications/read-all', {}).subscribe((notifications) => {
      this.notifications = notifications;
      this.applyFilter();
    });
  }

  get unreadCount(): number {
    return this.notifications.filter(n => !n.read).length;
  }

}
