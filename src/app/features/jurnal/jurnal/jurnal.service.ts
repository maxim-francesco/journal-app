import { inject, Injectable, OnInit, signal } from '@angular/core';
import { JurnalCrudService } from '../services/jurnal-crud.service';
import { Journal } from '../services/jurnal.model';
import { TimeService } from '../../../core/time.service';
import { CategoryService } from '../services/categories.service';
import { Category } from '../services/category.model';
import { response } from 'express';

@Injectable({
  providedIn: 'root',
})
export class JurnalService implements OnInit {
  private categoriesService = inject(CategoryService);
  categories = signal<Category[]>([]);

  ngOnInit(): void {
    this.categoriesService.getAllCategories().subscribe((response) => {
      this.categories.set(response);
    });
  }

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
