import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LogInService } from './log-in.service';

@Component({
  selector: 'app-log-in',
  imports: [CommonModule, FormsModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css',
})
export class LogInComponent {
  private router = inject(Router);
  private logInService = inject(LogInService);

  email: string = '';
  password: string = '';

  logIn() {
    this.logInService.logIn(this.email, this.password);
  }

  goToSignUp() {
    this.router.navigate(['/sign-in']);
  }
}
