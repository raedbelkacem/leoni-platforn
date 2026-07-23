import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html'
})
export class HomeComponent {

  features = [
    {
      icon: '🖥️',
      title: 'Real-time Monitoring',
      description: 'Monitor temperature, humidity, and electrical metrics across all server rooms in real time.'
    },
    {
      icon: '🤖',
      title: 'AI Assistant',
      description: 'An intelligent chatbot guides technicians through incidents and alerts managers automatically.'
    },
    {
      icon: '🔐',
      title: 'Access Control',
      description: 'IoT-based badge access system tracks who enters and exits each server room.'
    },
    {
      icon: '⚡',
      title: 'Incident Management',
      description: 'Track, assign, and resolve incidents with full history and status updates.'
    },
    {
      icon: '🔔',
      title: 'Smart Notifications',
      description: 'Instant alerts for critical conditions sent to the right person at the right time.'
    },
    {
      icon: '📊',
      title: 'Analytics Dashboard',
      description: 'Visualize sensor history and trends with interactive charts per room.'
    }
  ];

  stats = [
    { value: '6',    label: 'Server Rooms' },
    { value: '24/7', label: 'Monitoring' },
    { value: '100%', label: 'Uptime Target' },
    { value: 'AI',   label: 'Powered Assistant' }
  ];

}
