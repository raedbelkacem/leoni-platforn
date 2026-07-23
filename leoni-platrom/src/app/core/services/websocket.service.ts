import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WebsocketService {

  watchRoom(roomId: string): Observable<any> {
    return new Observable((observer) => {
      const socket = new WebSocket(`ws://localhost:8080/ws/rooms/${roomId}/live`);
      socket.onmessage = (event) => observer.next(JSON.parse(event.data));
      socket.onerror = (err) => observer.error(err);
      socket.onclose = () => observer.complete();
      return () => socket.close();
    });
  }

  watchNotifications(userId: string): Observable<any> {
    return new Observable((observer) => {
      const socket = new WebSocket(`ws://localhost:8080/ws/notifications/${userId}`);
      socket.onmessage = (event) => observer.next(JSON.parse(event.data));
      socket.onerror = (err) => observer.error(err);
      socket.onclose = () => observer.complete();
      return () => socket.close();
    });
  }

}
/*watchRoom() → listens to live sensor data for a specific room
watchNotifications() → listens to live alerts for a specific user

Both return an Observable — meaning any component that subscribes to them will automatically receive data every time Spring Boot pushes something.*/
