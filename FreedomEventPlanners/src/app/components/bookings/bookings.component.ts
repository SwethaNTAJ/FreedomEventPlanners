import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { EventService, Booking } from '../../services/event.service';
import { AuthService,User} from '../../services/auth.service'; 

@Component({
  selector: 'app-bookings',
  imports: [CommonModule, RouterModule],
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.css'
})
export class BookingsComponent {
 bookings: Booking[] = [];
  currentUser: User | null = null;
  isLoading = true;
  showSuccessMessage = false;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Check for success message
    this.route.queryParams.subscribe(params => {
      if (params['success'] === 'true') {
        this.showSuccessMessage = true;
      }
    });

    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      if (user) {
        this.loadBookings(user.id);
      } else {
        this.isLoading = false;
      }
    });
  }

  loadBookings(userId: string) {
    this.eventService.getUserBookings(userId).subscribe(bookings => {
      this.bookings = bookings.sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      this.isLoading = false;
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }

  formatTime(timeString: string): string {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  }
}
