import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class CacheService<T = any> {
  private readonly inMemoryCache = new Map<string, T>();
  private readonly platformId = inject(PLATFORM_ID);

  /**
   * Sets a value in the cache, persisting to localStorage.
   * @param key Cache key
   * @param value Data to cache
   */
  set(key: string, value: T): void {
    if (isPlatformBrowser(this.platformId)) {
      // Store in in-memory cache
      this.inMemoryCache.set(key, value);
      // Persist to localStorage
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error(`Failed to persist cache for key "${key}":`, error);
      }
    }
  }

  /**
   * Gets a value from the cache, checking localStorage if not in memory.
   * @param key Cache key
   * @returns Cached data or undefined if not found
   */
  get(key: string): T | undefined {
    if (isPlatformBrowser(this.platformId)) {
      // Check in-memory cache first
      const memoryData = this.inMemoryCache.get(key);
      if (memoryData !== undefined) {
        return memoryData;
      }

      // Check localStorage
      try {
        const stored = localStorage.getItem(key);
        if (stored) {
          const parsed = JSON.parse(stored) as T;
          // Restore to in-memory cache
          this.inMemoryCache.set(key, parsed);
          return parsed;
        }
      } catch (error) {
        console.error(`Failed to retrieve cache for key "${key}":`, error);
      }
    }
    return undefined;
  }
}
