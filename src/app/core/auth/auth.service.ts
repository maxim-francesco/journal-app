import { inject, Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  user,
} from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth: Auth = inject(Auth);
  currentUser$: Observable<any | null> = user(this.auth);

  async signUpWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<any> {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      return userCredential.user;
    } catch (error) {
      console.error('Eroare la sign up:', error);
      throw error;
    }
  }

  async signInWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<any> {
    try {
      const userCredential = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      return userCredential.user;
    } catch (error) {
      console.error('Eroare la log in:', error);
      throw error;
    }
  }

  async signOut(): Promise<void> {
    try {
      await signOut(this.auth);
    } catch (error) {
      console.error('Eroare la sign out:', error);
      throw error;
    }
  }

  getCurrentUser(): Observable<any | null> {
    return this.currentUser$;
  }
}
