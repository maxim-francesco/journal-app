import { inject, Injectable } from '@angular/core';
import { AuthService } from '../../../core/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class SignInService {
  errorMessage: string = '';
  private authService = inject(AuthService);

  async signUp(email: string, password: string) {
    try {
      await this.authService.signUpWithEmailAndPassword(email, password);
      console.log('Sign up cu succes!');
    } catch (error: any) {
      this.errorMessage = error.message;
    }
  }

  get getUserId() {
    return this.authService.getCurrentUser();
  }
}
