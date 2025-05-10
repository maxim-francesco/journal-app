import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConnectivityService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isOnlineSubject = new BehaviorSubject<boolean>(true); // Default to true
  readonly isOnline$: Observable<boolean> = this.isOnlineSubject.asObservable();

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      // Initial status
      this.updateStatus();

      // Listen for online/offline events
      window.addEventListener('online', () => this.updateStatus());
      window.addEventListener('offline', () => this.updateStatus());
    }
  }

  private updateStatus(): void {
    const isOnline = navigator.onLine;
    this.isOnlineSubject.next(isOnline);
  }

  /**
   * Gets the current online status.
   * @returns True if online, false if offline (always true in non-browser environments)
   */
  isOnline(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return navigator.onLine;
    }
    return true; // Default to true for SSR
  }
}
