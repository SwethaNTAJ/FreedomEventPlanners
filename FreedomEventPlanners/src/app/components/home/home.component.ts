import { Component ,OnInit} from '@angular/core';
import { EventService,Event } from '../../services/event.service'; 
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent   {
featuredEvents: Event[] = [];

   constructor(private eventService: EventService) {}

  ngOnInit() {
    this.eventService.getEvents().subscribe(events => {
      // Show first 3 events as featured
      this.featuredEvents = events.slice(0, 3);
    });
  }
}
