import { inject, Injectable } from '@angular/core';
import { Category } from './category.model';
import { CacheService } from '../../../core/cache.service';
import { Journal } from './jurnal.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryCacheService {
  private cacheService = inject(CacheService<Category[]>);
  private readonly cacheKey = 'categories';

  getAll(): Journal[] {
    return this.cacheService.get(this.cacheKey);
  }

  setAll(categories: Category[]) {
    this.cacheService.set(this.cacheKey, categories);
  }
}
