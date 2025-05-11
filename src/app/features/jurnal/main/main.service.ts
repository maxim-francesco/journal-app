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
      this.jurnalCrudService.getAllJournals().subscribe((response) => {
        this.journals.set(response);
        this.journalCacheService.setJournals(response);
      });
    } else {
      this.journals.set(this.journalCacheService.getJournals());
    }
  }

  //journal
  saveToJurnal(journal: Journal) {
    if (this.connectivityService.isOnline()) {
      this.journalCacheService.addJournal(journal, true);
      this.jurnalCrudService.updateJournal(journal.id!, journal);
    } else {
      this.journalCacheService.addJournal(journal, false);
    }
  }

  setJournal(journal: Journal) {
    this.selectedJournal = journal;
  }
}
