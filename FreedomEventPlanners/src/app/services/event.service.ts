import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Event {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  duration: string;
  image: string;
  features: string[];
  maxGuests: number;
  location: string;
}

export interface Booking {
  id: string;
  eventId: string;
  userId: string;
  eventTitle: string;
  date: string;
  time: string;
  guests: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  specialRequests?: string;
  contactInfo: {
    name: string;
    email: string;
    phone: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private events: Event[] = [
    {
      id: '1',
      title: 'Elegant Wedding Package',
      description: 'Create your dream wedding with our comprehensive wedding planning service. From venue decoration to catering coordination.',
      category: 'Wedding',
      price: 2500,
      duration: '8 hours',
      image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['Professional Photography', 'Floral Arrangements', 'Catering Coordination', 'Music & Entertainment', 'Venue Decoration'],
      maxGuests: 200,
      location: 'Various Premium Venues'
    },
    {
      id: '2',
      title: 'Corporate Conference',
      description: 'Professional corporate event planning for conferences, seminars, and business meetings with full technical support here you can see all changes  .',
      category: 'Corporate',
      price: 1800,
      duration: '6 hours',
      image: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['AV Equipment', 'Professional Staging', 'Catering Service', 'Registration Management', 'Technical Support'],
      maxGuests: 150,
      location: 'Business Centers & Hotels'
    },
    {
      id: '3',
      title: 'Birthday Celebration',
      description: 'Make birthdays unforgettable with our creative party planning services. Perfect for all ages with customizable themes also you can here .',
      category: 'Birthday',
      price: 800,
      duration: '4 hours',
      image: 'https://images.pexels.com/photos/1729797/pexels-photo-1729797.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['Theme Decoration', 'Entertainment', 'Custom Cake', 'Party Favors', 'Photography'],
      maxGuests: 50,
      location: 'Party Venues & Private Locations'
    },
    {
      id: '4',
      title: 'Graduation Party',
      description: 'Celebrate academic achievements with our graduation party planning service. Honor the graduate in style.',
      category: 'Graduation',
      price: 1200,
      duration: '5 hours',
      image: 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['Academic Theme Decor', 'Catering', 'Photo Booth', 'Achievement Display', 'Guest Coordination'],
      maxGuests: 80,
      location: 'Event Halls & Outdoor Venues'
    },
    {
      id: '5',
      title: 'Anniversary Celebration',
      description: 'Commemorate special milestones with our romantic anniversary celebration planning service.',
      category: 'Anniversary',
      price: 1500,
      duration: '6 hours',
      image: 'https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['Romantic Ambiance', 'Fine Dining', 'Live Music', 'Memory Display', 'Professional Photography'],
      maxGuests: 100,
      location: 'Elegant Venues & Gardens'
    },
    {
      id: '6',
      title: 'Product Launch Event',
      description: 'Launch your product with impact using our specialized product launch event planning service.',
      category: 'Corporate',
      price: 2200,
      duration: '4 hours',
      image: 'https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['Brand Integration', 'Media Coverage', 'Product Display', 'Networking Area', 'Promotional Materials'],
      maxGuests: 120,
      location: 'Convention Centers & Modern Venues'
    }
  ];

  private bookingsSubject = new BehaviorSubject<Booking[]>([]);
  public bookings$ = this.bookingsSubject.asObservable();

  constructor() {
    // Load bookings from localStorage
    const savedBookings = localStorage.getItem('bookings');
    if (savedBookings) {
      this.bookingsSubject.next(JSON.parse(savedBookings));
    }
  }

  getEvents(): Observable<Event[]> {
    return new Observable(observer => {
      setTimeout(() => {
        observer.next(this.events);
        observer.complete();
      }, 500);
    });
  }

  getEventById(id: string): Observable<Event | undefined> {
    return new Observable(observer => {
      setTimeout(() => {
        const event = this.events.find(e => e.id === id);
        observer.next(event);
        observer.complete();
      }, 300);
    });
  }

  getEventsByCategory(category: string): Observable<Event[]> {
    return new Observable(observer => {
      setTimeout(() => {
        const filteredEvents = this.events.filter(e => 
          category === 'All' || e.category === category
        );
        observer.next(filteredEvents);
        observer.complete();
      }, 300);
    });
  }

  bookEvent(bookingData: Omit<Booking, 'id' | 'status'>): Observable<boolean> {
    return new Observable(observer => {
      setTimeout(() => {
        const booking: Booking = {
          ...bookingData,
          id: Date.now().toString(),
          status: 'pending'
        };
        
        const currentBookings = this.bookingsSubject.value;
        const updatedBookings = [...currentBookings, booking];
        
        localStorage.setItem('bookings', JSON.stringify(updatedBookings));
        this.bookingsSubject.next(updatedBookings);
        
        observer.next(true);
        observer.complete();
      }, 1000);
    });
  }

  getUserBookings(userId: string): Observable<Booking[]> {
    return new Observable(observer => {
      setTimeout(() => {
        const userBookings = this.bookingsSubject.value.filter(b => b.userId === userId);
        observer.next(userBookings);
        observer.complete();
      }, 300);
    });
  }
}