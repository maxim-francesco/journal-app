import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { SignInService } from './sign-in.service';

@Component({
  selector: 'app-sign-in',
  imports: [CommonModule, FormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent {
  private signInService = inject(SignInService);

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
}
