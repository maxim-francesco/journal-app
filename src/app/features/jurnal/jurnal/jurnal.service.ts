import { inject, Injectable, OnInit, signal } from '@angular/core';
import { JurnalCrudService } from '../services/jurnal-crud.service';
import { Journal } from '../services/jurnal.model';
import { TimeService } from '../../../core/time.service';
import { CategoryService } from '../services/categories.service';
import { Category } from '../services/category.model';
import { response } from 'express';
import { JournalCacheService } from '../services/journal-cache.service';
import { ConnectivityService } from '../../../core/connectivity.service';
import { CategoryCacheService } from '../services/category-cache.service';

@Injectable({
  providedIn: 'root',
})
export class JurnalService implements OnInit {
  private categoriesService = inject(CategoryService);
  private categoriesCacheService = inject(CategoryCacheService);
  categories = signal<Category[]>([]);

  ngOnInit(): void {
    const categories = this.categoriesCacheService.getAll();
    console.log('aici boss', categories);

    if (categories != undefined || this.connectivityService.isOnline()) {
      this.categoriesService.getAllCategories().subscribe((response) => {
        this.categories.set(response);
        this.categoriesCacheService.setAll(response);
      });
    } else {
      this.categories.set(categories);
    }
  }

  //journal

  private journalCacheService = inject(JournalCacheService);
  private connectivityService = inject(ConnectivityService);
  private jurnalCrudService = inject(JurnalCrudService);

  createNewJurnal(title: string, date: string, category: string) {
    const newJurnal: Journal = {
      title: title,
      date: date,
      category: category,
    };
    if (this.connectivityService.isOnline()) {
      this.journalCacheService.addJournal(newJurnal, 0);
      this.jurnalCrudService.addJournal(newJurnal);
    } else {
      this.journalCacheService.addJournal(newJurnal, 1);
    }
  }

  //time

  private timeService = inject(TimeService);

  getMaxDate() {
    return this.timeService.getMaxDate();
  }
}
