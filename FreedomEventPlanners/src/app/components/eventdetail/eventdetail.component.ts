import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EventService,Event } from '../../services/event.service';
import { AuthService } from '../../services/auth.service'; 

@Component({
  selector: 'app-eventdetail',
  imports: [CommonModule, RouterModule],
  templateUrl: './eventdetail.component.html',
  styleUrl: './eventdetail.component.css'
})
export class EventdetailComponent implements OnInit{
event: Event | null = null;
  relatedEvents: Event[] = [];
  notFound = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const eventId = params['id'];
      this.loadEvent(eventId);
    });
  }

  loadEvent(id: string) {
    this.eventService.getEventById(id).subscribe(event => {
      if (event) {
        this.event = event;
        this.loadRelatedEvents(event.category, event.id);
      } else {
        this.notFound = true;
      }
    });
  }

  loadRelatedEvents(category: string, currentEventId: string) {
    this.eventService.getEventsByCategory(category).subscribe(events => {
      this.relatedEvents = events
        .filter(e => e.id !== currentEventId)
        .slice(0, 3);
    });
  }
}
