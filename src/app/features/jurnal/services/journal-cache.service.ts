import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CacheService } from '../../../core/cache.service';
import { JournalCache } from './jurnal-cache.model';

@Injectable({
  providedIn: 'root',
})
export class JournalCacheService {
  private cacheService = inject(CacheService<JournalCache[]>);
  private platformId = inject(PLATFORM_ID);
  private readonly cacheKey = 'journal_cache';

  /**
   * Retrieves the array of JournalCache objects from the cache.
   * @returns JournalCache array or empty array if not found
   */
  get(): JournalCache[] {
    // Try to get from CacheService (in-memory)
    let cachedData = this.cacheService.get(this.cacheKey);

    // If not in memory, try localStorage (browser only)
    if (!cachedData && isPlatformBrowser(this.platformId)) {
      try {
        const stored = localStorage.getItem(this.cacheKey);
        if (stored) {
          cachedData = JSON.parse(stored) as JournalCache[];
          // Restore to in-memory cache
          this.cacheService.set(this.cacheKey, cachedData);
        }
      } catch (error) {
        console.error(
          `Failed to retrieve journal cache from localStorage:`,
          error
        );
      }
    }

    return cachedData || [];
  }

  /**
   * Adds a new JournalCache object to the cached array.
   * @param journalCache JournalCache object to add
   */
  add(journalCache: JournalCache): void {
    if (isPlatformBrowser(this.platformId)) {
      // Get current array
      const currentCache = this.get();
      // Add new item
      const updatedCache = [...currentCache, journalCache];
      // Update in-memory cache
      this.cacheService.set(this.cacheKey, updatedCache);
      // Update localStorage
      try {
        localStorage.setItem(this.cacheKey, JSON.stringify(updatedCache));
      } catch (error) {
        console.error(
          `Failed to persist journal cache to localStorage:`,
          error
        );
      }
    }
  }
}
