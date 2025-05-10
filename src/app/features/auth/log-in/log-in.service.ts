import { inject, Injectable, signal } from '@angular/core';
import { AuthService } from '../../../core/auth/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LogInService {
  private authService = inject(AuthService);
  private router = inject(Router);

  notValidUser = signal<string>('');

  async logIn(email: string, password: string) {
    try {
      const user = await this.authService.signInWithEmailAndPassword(
        email,
        password
      );
      this.router.navigate(['/main']);
      this.notValidUser.set('');
      return user;
    } catch (error: any) {
      this.notValidUser.set('Wrong email or password');
    }
  }
}
