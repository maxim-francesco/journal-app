import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { SignInService } from './sign-in.service';
import { RealtimeDatabaseService } from '../../../core/realtime-database.service';
import { Router } from '@angular/router';
import { user } from '@angular/fire/auth';

@Component({
  selector: 'app-sign-in',
  imports: [CommonModule, FormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent {
  private signInService = inject(SignInService);
  private realtimeDatabase = inject(RealtimeDatabaseService);
  private router = inject(Router);

  showSignIn: boolean = true;
  showSetPassword: boolean = false;
  showSetPin: boolean = false;

  email: string = '';
  password: string = '';
  pin: string = '';

  goToPassword() {
    this.showSignIn = false;
    this.showSetPassword = true;
  }

  goToPin() {
    this.signInService.signUp(this.email, this.password);
    this.showSignIn = false;
    this.showSetPassword = false;
    this.showSetPin = true;
  }

  goToMain() {
    this.realtimeDatabase.add(`${this.email.split('@')[0]}/pin/`, this.pin);
    this.router.navigate(['/main']);
  }

  goToLogIn() {
    this.router.navigate(['/log-in']);
  }
}
