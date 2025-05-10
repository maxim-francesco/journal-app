import { inject, Injectable } from '@angular/core';
import { JurnalCrudService } from '../services/jurnal-crud.service';
import { Journal } from '../services/jurnal.model';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  private jurnalCrudService = inject(JurnalCrudService);
  selectedJournal?: Journal;

  //journal
  saveToJurnal(journal: Journal) {
    this.jurnalCrudService.updateJournal(journal.id!, journal);
  }

  setJournal(journal: Journal) {
    this.selectedJournal = journal;
  }
}
