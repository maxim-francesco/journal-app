import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { SignInService } from './sign-in.service';
import { RealtimeDatabaseService } from '../../../core/realtime-database.service';
import { Router } from '@angular/router';
import { User, user } from '@angular/fire/auth';
import { ValidationService } from '../../../core/validation.service';

@Component({
  selector: 'app-sign-in',
  imports: [CommonModule, FormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent {
  private signInService = inject(SignInService);
  private realtimeDatabase = inject(RealtimeDatabaseService);
  private validationService = inject(ValidationService);
  private router = inject(Router);

  showSignIn: boolean = true;
  showSetPassword: boolean = false;
  showSetPin: boolean = false;

  email: string = '';
  password: string = '';
  pin: string = '';

  user?: User;

  notValidEmail?: string;
  notValidPassword?: string;
  notValidPin?: string;

  goToPassword() {
    if (this.validationService.isValidEmail(this.email)) {
      this.notValidEmail = '';
      this.showSignIn = false;
      this.showSetPassword = true;
    } else {
      this.notValidEmail = 'This is not an valid email!';
    }
  }

  async goToPin() {
    if (this.validationService.isValidPassword(this.password)) {
      this.notValidPassword = '';
      this.user = await this.signInService.signUp(this.email, this.password);
      this.showSignIn = false;
      this.showSetPassword = false;
      this.showSetPin = true;
    } else {
      this.notValidPassword =
        'Your password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one number, and one special character.';
    }
  }

  goToMain() {
    if (this.validationService.isValidPin(this.pin)) {
      this.notValidPin = '';
      this.realtimeDatabase.add(`${this.user!.uid}/pin/`, this.pin);
      this.router.navigate(['/main']);
    } else {
      this.notValidPin = 'Your PIN must be exactly 4 digits long';
    }
  }

  goToLogIn() {
    this.router.navigate(['/log-in']);
  }
}
