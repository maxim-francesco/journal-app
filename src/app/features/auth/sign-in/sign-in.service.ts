import { inject, Injectable } from '@angular/core';
import { AuthService } from '../../../core/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class SignInService {
  email!: string;
  password!: string;
  errorMessage: string = '';
  private authService = inject(AuthService);

  async signUp() {
    try {
      await this.authService.signUpWithEmailAndPassword(
        this.email,
        this.password
      );
      console.log('Sign up cu succes!');
      // Redirecționează utilizatorul
    } catch (error: any) {
      this.errorMessage = error.message;
    }
  }
}
