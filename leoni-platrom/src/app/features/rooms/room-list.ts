import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-room-list',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './room-list.html',
  styleUrls: ['./room-list.scss']
})
export class RoomListComponent implements OnInit{
  rooms: any[] = [];
  searchTerm: string = '';
  constructor(private http:HttpClient) {}
  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:8080/api/rooms').subscribe((rooms) => {
      this.rooms = rooms;
    });
  }
  get filteredRooms() {
    return this.rooms.filter(r =>
      r.code.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      r.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
}}
