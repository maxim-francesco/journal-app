import { inject, Injectable } from '@angular/core';
import { CacheService } from '../../../core/cache.service';
import { JournalCache } from './jurnal-cache.model';
import { Journal } from './jurnal.model';

@Injectable({
  providedIn: 'root',
})
export class JournalCacheService {
  private cacheService = inject(CacheService<JournalCache[]>);
  private readonly cacheKey = 'journals';

  getJournals(): JournalCache[] {
    return this.cacheService.get(this.cacheKey);
  }

  setJournals(journals: Journal[]): void {
    this.cacheService.set(this.cacheKey, this.processJournals(journals));
  }

  private processJournals(journals: Journal[]): JournalCache[] {
    const cachedJournals: JournalCache[] = [];
    journals.forEach((item) => {
      cachedJournals.push({ comming: false, journal: item });
    });
    return cachedJournals;
  }

  addJournal(journal: Journal, online: boolean) {
    const journals = this.getJournals();
    journals.push({
      comming: !online,
      journal: journal,
    });
    this.cacheService.set(this.cacheKey, journals);
  }
}
