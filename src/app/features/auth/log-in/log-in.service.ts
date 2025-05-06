import { inject, Injectable } from '@angular/core';
import { AuthService } from '../../../core/auth/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LogInService {
  errorMessage: string = '';
  private authService = inject(AuthService);
  private router = inject(Router);

  async logIn(email: string, password: string) {
    try {
      await this.authService.signInWithEmailAndPassword(email, password);
      this.router.navigate(['/main']);
      console.log('Log In cu succes!');
    } catch (error: any) {
      this.errorMessage = error.message;
    }
  }
}
