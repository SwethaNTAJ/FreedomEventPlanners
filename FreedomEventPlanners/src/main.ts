import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { HomeComponent } from './app/components/home/home.component'; 
import { RouterOutlet } from '@angular/router';
import { provideRouter } from '@angular/router';
import { HeaderComponent } from './app/components/header/header.component';  
import { LoginComponent } from './app/components/login/login.component';
import { SignUpComponent } from './app/components/sign-up/sign-up.component';
import { EventsComponent } from './app/components/events/events.component';
import { EventdetailComponent } from './app/components/eventdetail/eventdetail.component';
import { BookingComponent } from './app/components/booking/booking.component';
import { BookingsComponent } from './app/components/bookings/bookings.component'; 


const routes = [
  { path: '', component: HomeComponent },  
  { path: 'login', component: LoginComponent },
  { path: 'signup', component:SignUpComponent  }, 
  { path: 'events', component: EventsComponent },
  { path: 'events/:id', component: EventdetailComponent },  
  { path: 'book/:id', component: BookingComponent },
  { path: 'bookings', component: BookingsComponent },
  { path: '**', redirectTo: '' }
];
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ HeaderComponent, RouterOutlet , ],
  template: `
    <app-header></app-header>
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    main {
      min-height: calc(100vh - 80px);
    }
  `]
})
export class App {}

bootstrapApplication(App, {
  providers: [
    provideRouter(routes)
  ]
});