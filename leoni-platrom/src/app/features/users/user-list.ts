import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.html'
})
export class UserListComponent implements OnInit{
  users: any[] = [];
  showForm: boolean = false;
  constructor(private  http:HttpClient) {}

  ngOnInit() {
      this.http.get<any[]>('http://localhost:8080/api/users').subscribe((users) => {
        this.users = users;
      });
  }
  deleteUser(id: string): void {
    this.http.delete(`http://localhost:8080/api/users/${id}`).subscribe(() => {
      this.users = this.users.filter(u => u.id !== id);
    });
  }
}
