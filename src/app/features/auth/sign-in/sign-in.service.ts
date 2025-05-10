import { inject, Injectable } from '@angular/core';
import { AuthService } from '../../../core/auth/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SignInService {
  // firebase
  private authService = inject(AuthService);
  private router = inject(Router);

  async signUp(email: string, password: string) {
    try {
      const user = await this.authService.signUpWithEmailAndPassword(
        email,
        password
      );
      console.log('Sign up cu succes!');
      return user;
    } catch (error: any) {
      return undefined;
    }
  }

  get getUserId() {
    return this.authService.getCurrentUser();
  }

  //validators
}
