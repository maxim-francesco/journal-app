import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  imports: [CommonModule, FormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent {
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
    console.log('here boss:', this.email, this.password);

    this.showSignIn = false;
    this.showSetPassword = false;
    this.showSetPin = true;
  }
}
