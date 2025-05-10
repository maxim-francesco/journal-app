import { inject, Injectable, OnInit, signal } from '@angular/core';
import { JurnalCrudService } from '../services/jurnal-crud.service';
import { Journal } from '../services/jurnal.model';
import { TimeService } from '../../../core/time.service';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  private jurnalCrudService = inject(JurnalCrudService);
  private timeService = inject(TimeService);
  selectedJournal?: Journal;

  //journal
  saveToJurnal(journal: Journal) {
    this.jurnalCrudService.updateJournal(journal.id!, journal);
  }

  setJournal(journal: Journal) {
    this.selectedJournal = journal;
  }

  //time
  getPeriod(time: string) {
    return this.timeService.getRelativeTime(time);
  }
}
