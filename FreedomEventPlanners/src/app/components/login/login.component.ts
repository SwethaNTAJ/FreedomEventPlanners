import { Component } from '@angular/core'; 
import{ AuthService } from '../../services/auth.service';
import{ Router } from '@angular/router';
import{ CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
 credentials = {
    email: '',
    password: ''
  };
  
  showPassword = false;
  isLoading = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.credentials.email && this.credentials.password) {
      this.isLoading = true;
      this.errorMessage = '';

      this.authService.login(this.credentials.email, this.credentials.password)
        .subscribe({
          next: (success) => {
            this.isLoading = false;
            if (success) {
              this.router.navigate(['/events']);
            } else {
              this.errorMessage = 'Invalid email or password. Please try again.';
            }
          },
          error: () => {
            this.isLoading = false;
            this.errorMessage = 'An error occurred. Please try again.';
          }
        });
    }
  }
}
