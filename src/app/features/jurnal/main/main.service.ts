import { inject, Injectable, OnInit, signal } from '@angular/core';
import { JurnalCrudService } from '../services/jurnal-crud.service';
import { Journal } from '../services/jurnal.model';
import { JournalCacheService } from '../services/journal-cache.service';
import { ConnectivityService } from '../../../core/connectivity.service';
import { JournalCache } from '../services/jurnal-cache.model';

@Injectable({
  providedIn: 'root',
})
export class MainService implements OnInit {
  private jurnalCrudService = inject(JurnalCrudService);
  private journalCacheService = inject(JournalCacheService);
  private connectivityService = inject(ConnectivityService);
  selectedJournal?: Journal;
  journals = signal<Journal[]>([]);

  ngOnInit(): void {
    if (this.connectivityService.isOnline()) {
      this.addCachedJournals();
      this.jurnalCrudService.getAllJournals().subscribe((response) => {
        this.journals.set(response);
        this.journalCacheService.setJournals(response);
      });
    } else {
      this.journals.set([]);
      this.journalCacheService.getJournals().forEach((j) => {
        if (j.comming != 2) {
          this.journals().push(j.journal);
        }
      });
    }
  }

  private addCachedJournals() {
    const cachedJournals = this.journalCacheService.getJournals();
    if (cachedJournals) {
      cachedJournals.forEach((j) => {
        if (j.comming == 1) {
          this.jurnalCrudService.addJournal(j.journal);
        }
        if (j.comming == 2) {
          this.jurnalCrudService.deleteJournal(j.journal.id!);
        }
      });

      const journalsNormal: Journal[] = [];
      cachedJournals.forEach((j) => {
        journalsNormal.push(j.journal);
      });

      this.journalCacheService.setJournals(journalsNormal);
    }
  }

  //journal
  saveToJurnal(journal: Journal) {
    if (this.connectivityService.isOnline()) {
      console.log('daca sunt aici imi bag pl din nou');
      this.jurnalCrudService.updateJournal(journal.id!, journal);
      this.journalCacheService.addJournal(journal, 0);
    } else {
      console.log('daca sunt aici imi bag pl');

      this.journalCacheService.addJournal(journal, 1);
    }
  }

  setJournal(journal: Journal) {
    this.selectedJournal = journal;
  }
}
