import { inject, Injectable, OnInit, signal } from '@angular/core';
import { JurnalCrudService } from '../services/jurnal-crud.service';
import { Journal } from '../services/jurnal.model';

@Injectable({
  providedIn: 'root',
})
export class MainService implements OnInit {
  private jurnalCrudService = inject(JurnalCrudService);
  selectedJournal?: Journal;
  journals = signal<Journal[]>([]);

  ngOnInit(): void {
    this.jurnalCrudService.getAllJournals().subscribe((response) => {
      this.journals.set(response);
    });
  }

  //journal
  saveToJurnal(journal: Journal) {
    this.jurnalCrudService.updateJournal(journal.id!, journal);
  }

  setJournal(journal: Journal) {
    this.selectedJournal = journal;
  }
}
