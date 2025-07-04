import { Component } from '@angular/core'; 
import { CommonModule } from '@angular/common'; 
import { Router, RouterModule } from '@angular/router'; 
import { EventService,Event } from '../../services/event.service'; 

@Component({
  selector: 'app-events',
  imports: [CommonModule, RouterModule],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent {
  events: Event[] = [];
  filteredEvents: Event[] = [];
  selectedCategory = 'All';
  isLoading = true;

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.isLoading = true;
    this.eventService.getEvents().subscribe(events => {
      this.events = events;
      this.filteredEvents = events;
      this.isLoading = false;
    });
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;
    this.isLoading = true;
    
    this.eventService.getEventsByCategory(category).subscribe(events => {
      this.filteredEvents = events;
      this.isLoading = false;
    });
  }
}
