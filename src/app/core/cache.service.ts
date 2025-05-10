import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class CacheService<T = any> {
  private readonly inMemoryCache = new Map<string, T>();
  private readonly platformId = inject(PLATFORM_ID);

  /**
   * Sets a value in the cache.
   * @param key Cache key
   * @param value Data to cache
   */
  set(key: string, value: T): void {
    if (isPlatformBrowser(this.platformId)) {
      this.inMemoryCache.set(key, value);
    }
  }

  /**
   * Gets a value from the cache.
   * @param key Cache key
   * @returns Cached data or undefined if not found
   */
  get(key: string): T | undefined {
    if (isPlatformBrowser(this.platformId)) {
      return this.inMemoryCache.get(key);
    }
    return undefined;
  }
}
