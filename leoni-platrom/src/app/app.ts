import {ApplicationConfig, Component} from '@angular/core';
import {provideRouter, RouterOutlet} from '@angular/router';
import { NavbarComponent } from './layout/navbar.component';
import { ChatbotWidgetComponent } from './features/chatbot/chatbot-widget';
import {provideHttpClient} from '@angular/common/http';
import {routes} from './app.routes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, ChatbotWidgetComponent],
  template: `
    <app-navbar></app-navbar>
    <main>
      <router-outlet></router-outlet>
    </main>
    <app-chatbot-widget></app-chatbot-widget>
  `
})
export class AppComponent {}
/*<app-navbar> → places the navbar at the top of every page
<router-outlet> → this is where each page component loads based on the current route*/
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient()
  ]
};
