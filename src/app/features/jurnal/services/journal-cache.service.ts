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

  setJournals2(journals: JournalCache[]) {
    this.cacheService.set(this.cacheKey, journals);
  }

  private processJournals(journals: Journal[]): JournalCache[] {
    const cachedJournals: JournalCache[] = [];
    journals.forEach((item) => {
      cachedJournals.push({ comming: 0, journal: item });
    });
    return cachedJournals;
  }

  addJournal(journal: Journal, online: number) {
    const journals = this.getJournals();

    journals.filter((j) => j.journal.id == journal.id);

    journals.push({
      comming: online,
      journal: journal,
    });
    this.cacheService.set(this.cacheKey, journals);
  }

  deleteJournal(journal: Journal) {
    const journals = this.getJournals();
    journals.forEach((j) => {
      if ((j.journal.id = journal.id)) {
        j.comming = 2;
      }
    });
    console.log(journals);

    this.setJournals2(journals);
  }
}
