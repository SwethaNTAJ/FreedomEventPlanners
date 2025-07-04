import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EventService,Booking,Event } from '../../services/event.service'; 
import { AuthService, User } from '../../services/auth.service'; 
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-booking',
  imports: [CommonModule, RouterModule,FormsModule, ],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent implements OnInit{
 event: Event | null = null;
  currentUser: User | null = null;
  notFound = false;
  isLoading = false;
  errorMessage = '';
  minDate = '';

  bookingData = {
    date: '',
    time: '',
    guests: 1,
    specialRequests: '',
    contactInfo: {
      name: '',
      email: '',
      phone: ''
    }
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    private authService: AuthService
  ) {
    // Set minimum date to today
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }

  ngOnInit() {
    // Check if user is authenticated
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      if (user) {
        // Pre-fill contact info if user is logged in
        this.bookingData.contactInfo.name = `${user.firstName} ${user.lastName}`;
        this.bookingData.contactInfo.email = user.email;
        this.bookingData.contactInfo.phone = user.phone || '';
      }
    });

    this.route.params.subscribe(params => {
      const eventId = params['id'];
      this.loadEvent(eventId);
    });
  }

  loadEvent(id: string) {
    this.eventService.getEventById(id).subscribe(event => {
      if (event) {
        this.event = event;
      } else {
        this.notFound = true;
      }
    });
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }

  formatTime(timeString: string): string {
    if (!timeString) return '';
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  }

  getAdditionalGuestFee(): number {
    if (!this.event || this.bookingData.guests <= 50) return 0;
    return (this.bookingData.guests - 50) * 25; // $25 per additional guest
  }

  getTotalPrice(): number {
    if (!this.event) return 0;
    return this.event.price + this.getAdditionalGuestFee();
  }

  onSubmit() {
    if (!this.event || !this.currentUser) {
      this.errorMessage = 'Please log in to complete your booking.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const booking = {
      eventId: this.event.id,
      userId: this.currentUser.id,
      eventTitle: this.event.title,
      date: this.bookingData.date,
      time: this.bookingData.time,
      guests: this.bookingData.guests,
      totalPrice: this.getTotalPrice(),
      specialRequests: this.bookingData.specialRequests,
      contactInfo: this.bookingData.contactInfo
    };

    this.eventService.bookEvent(booking).subscribe({
      next: (success) => {
        this.isLoading = false;
        if (success) {
          this.router.navigate(['/bookings'], { 
            queryParams: { success: 'true' } 
          });
        } else {
          this.errorMessage = 'Failed to create booking. Please try again.';
        }
      },
      error: () => {
        this.isLoading = false;
        this.errorMessage = 'An error occurred. Please try again.';
      }
    });
  }
}
