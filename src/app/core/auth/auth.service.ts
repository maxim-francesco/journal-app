import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  user,
  onAuthStateChanged,
  User,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth: Auth = inject(Auth);
  currentUser$: Observable<any | null> = user(this.auth);
  private userSubject = new BehaviorSubject<any | null>(null);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  constructor() {
    // Initialize auth state listener to restore user session
    this.initAuthState();
  }

  private initAuthState(): void {
    // Listen for authentication state changes
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        // User is signed in
        this.userSubject.next(user);
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('currentUser', JSON.stringify(user)); // Save user to localStorage
        }
      } else {
        // User is signed out
        this.userSubject.next(null);
        if (isPlatformBrowser(this.platformId)) {
          localStorage.removeItem('currentUser'); // Clear localStorage
        }
      }
    });

    // Check for stored user in localStorage on app init

    if (isPlatformBrowser(this.platformId)) {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        this.userSubject.next(JSON.parse(storedUser));
        this.router.navigate(['/main']);
      }
    }
  }

  async signUpWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<User> {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      const user = userCredential.user;
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('currentUser', JSON.stringify(user)); // Save user to localStorage
      }
      this.userSubject.next(user); // Update BehaviorSubject
      return user;
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
      const user = userCredential.user;
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('currentUser', JSON.stringify(user)); // Save user to localStorage
      }
      this.userSubject.next(user); // Update BehaviorSubject
      return user;
    } catch (error) {
      console.error('Eroare la log in:', error);
      throw error;
    }
  }

  async signOut(): Promise<void> {
    try {
      await signOut(this.auth);
      if (isPlatformBrowser(this.platformId)) {
        localStorage.removeItem('currentUser'); // Clear localStorage on sign out
      }
      this.userSubject.next(null); // Clear BehaviorSubject
    } catch (error) {
      console.error('Eroare la sign out:', error);
      throw error;
    }
  }

  getCurrentUser(): Observable<any | null> {
    return this.userSubject.asObservable(); // Return BehaviorSubject as Observable
  }

  // Optional: Get user ID directly
  getUserId(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      const storedUser = localStorage.getItem('currentUser');
      return storedUser ? JSON.parse(storedUser).uid : null;
    }
    return null; // Return null if not in browser
  }
}
