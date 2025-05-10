import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface CacheEntry<T> {
  data: T;
  expiry: number | null; // Timestamp for expiration, null if no expiry
}

@Injectable({
  providedIn: 'root',
})
export class CacheService<T = any> {
  private readonly inMemoryCache = new Map<string, CacheEntry<T>>();
  private readonly platformId = inject(PLATFORM_ID);

  /**
   * Sets a value in the cache.
   * @param key Cache key
   * @param value Data to cache
   * @param ttl Time-to-live in milliseconds (optional, defaults to no expiry)
   * @param persist Whether to store in localStorage (default: false)
   */
  set(key: string, value: T, ttl?: number, persist: boolean = false): void {
    const expiry = ttl ? Date.now() + ttl : null;
    const entry: CacheEntry<T> = { data: value, expiry };

    // Store in in-memory cache
    this.inMemoryCache.set(key, entry);

    // Store in localStorage if persist is true and in browser
    if (persist && isPlatformBrowser(this.platformId)) {
      try {
        localStorage.setItem(key, JSON.stringify(entry));
      } catch (error) {
        console.error(`Failed to persist cache for key "${key}":`, error);
      }
    }
  }

  /**
   * Gets a value from the cache.
   * @param key Cache key
   * @param checkPersistent Whether to check localStorage if not found in memory (default: true)
   * @returns Cached data or undefined if not found or expired
   */
  get(key: string, checkPersistent: boolean = true): T | undefined {
    // Check in-memory cache first
    const memoryEntry = this.inMemoryCache.get(key);
    if (memoryEntry && this.isValidEntry(memoryEntry)) {
      return memoryEntry.data;
    }

    // Check localStorage if in browser and checkPersistent is true
    if (checkPersistent && isPlatformBrowser(this.platformId)) {
      try {
        const stored = localStorage.getItem(key);
        if (stored) {
          const entry: CacheEntry<T> = JSON.parse(stored);
          if (this.isValidEntry(entry)) {
            // Restore to in-memory cache
            this.inMemoryCache.set(key, entry);
            return entry.data;
          } else {
            // Remove expired entry from localStorage
            localStorage.removeItem(key);
          }
        }
      } catch (error) {
        console.error(`Failed to retrieve cache for key "${key}":`, error);
      }
    }

    // Not found or expired
    return undefined;
  }

  /**
   * Clears a specific cache entry.
   * @param key Cache key
   */
  clear(key: string): void {
    // Remove from in-memory cache
    this.inMemoryCache.delete(key);

    // Remove from localStorage if in browser
    if (isPlatformBrowser(this.platformId)) {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.error(`Failed to clear cache for key "${key}":`, error);
      }
    }
  }

  /**
   * Clears all cache entries.
   */
  clearAll(): void {
    // Clear in-memory cache
    this.inMemoryCache.clear();

    // Clear all cache-related localStorage entries if in browser
    if (isPlatformBrowser(this.platformId)) {
      try {
        Object.keys(localStorage)
          .filter((key) => key.startsWith('cache_')) // Optional: Use a prefix for cache keys
          .forEach((key) => localStorage.removeItem(key));
      } catch (error) {
        console.error('Failed to clear all cache:', error);
      }
    }
  }

  /**
   * Checks if a cache entry is valid (not expired).
   * @param entry Cache entry
   * @returns True if valid, false otherwise
   */
  private isValidEntry(entry: CacheEntry<T>): boolean {
    if (!entry.expiry) return true; // No expiry
    return Date.now() < entry.expiry; // Check if still valid
  }
}
