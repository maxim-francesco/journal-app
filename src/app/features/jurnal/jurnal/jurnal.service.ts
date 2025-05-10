import { inject, Injectable } from '@angular/core';
import { JurnalCrudService } from '../services/jurnal-crud.service';
import { Journal } from '../services/jurnal.model';
import { TimeService } from '../../../core/time.service';

@Injectable({
  providedIn: 'root',
})
export class JurnalService {
  //journal

  private jurnalCrudService = inject(JurnalCrudService);

  createNewJurnal(title: string, date: string, category: string) {
    const newJurnal: Journal = {
      title: title,
      date: date,
      category: category,
    };
    this.jurnalCrudService.addJournal(newJurnal);
  }

  //time

  private timeService = inject(TimeService);

  getMaxDate() {
    return this.timeService.getMaxDate();
  }
}
