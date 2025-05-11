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

  getJournals(): Journal[] {
    const journals: JournalCache[] | undefined = this.cacheService.get(
      this.cacheKey
    );
    const normalJournals: Journal[] = [];
    if (journals) {
      journals.forEach((element: JournalCache) => {
        normalJournals.push(element.journal);
      });
    }
    return normalJournals;
  }

  setJournals(journals: Journal[]): void {
    this.cacheService.set(this.cacheKey, this.processJournals(journals));
  }

  private processJournals(journals: Journal[]): JournalCache[] {
    const cachedJournals: JournalCache[] = [];
    journals.forEach((item) => {
      cachedJournals.push({ comming: false, journal: item });
    });
    console.log('Processed journals:', cachedJournals);
    return cachedJournals;
  }

  addJournal(journal: Journal, online: boolean) {
    const journals = this.getJournals();
    const cachedJournals = this.processJournals(journals);
    cachedJournals.push({
      comming: !online,
      journal: journal,
    });
    this.cacheService.set(this.cacheKey, cachedJournals);
  }
}
