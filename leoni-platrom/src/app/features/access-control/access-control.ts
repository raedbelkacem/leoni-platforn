import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-access-control',
  imports:[CommonModule],
  standalone: true,
  templateUrl:'./access-control.html'
})
export class AccessControlComponent implements OnInit {
  accessLogs: any[] = []
  currentOccupants: any[] = []

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.currentOccupants = [
      {id: 'u1', fullName: 'Ahmed Ben Ali', role: 'TECHNICIAN', room: 'TN4', enteredAt: '2026-07-07T09:00:00Z'},
      {id: 'u2', fullName: 'Sarra Mansouri', role: 'MANAGER', room: 'TNM', enteredAt: '2026-07-07T08:30:00Z'},
    ];

    this.accessLogs = [
      {id: 'a1', fullName: 'Ahmed Ben Ali', room: 'TN4', action: 'ENTRY', timestamp: '2026-07-07T09:00:00Z'},
      {id: 'a2', fullName: 'Sarra Mansouri', room: 'TNM', action: 'ENTRY', timestamp: '2026-07-07T08:30:00Z'},
      {id: 'a3', fullName: 'Mohamed Trabelsi', room: 'SBTN', action: 'EXIT', timestamp: '2026-07-07T08:00:00Z'},
      {id: 'a4', fullName: 'Raed Belkacem', room: 'MAC', action: 'ENTRY', timestamp: '2026-07-06T17:00:00Z'},
      {id: 'a5', fullName: 'Ahmed Ben Ali', room: 'TN3', action: 'EXIT', timestamp: '2026-07-06T16:00:00Z'},
    ];
  }
}
