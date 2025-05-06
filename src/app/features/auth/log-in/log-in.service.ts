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
      const user = await this.authService.signInWithEmailAndPassword(
        email,
        password
      );
      this.router.navigate(['/main']);
      console.log('Log In cu succes!');
      return user;
    } catch (error: any) {
      this.errorMessage = error.message;
    }
  }
}
