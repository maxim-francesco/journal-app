import { inject, Injectable, OnInit, signal } from '@angular/core';
import { JurnalCrudService } from '../services/jurnal-crud.service';
import { Journal } from '../services/jurnal.model';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  selectedJournal?: Journal;

  setJournal(journal: Journal) {
    this.selectedJournal = journal;
  }
}
