import { inject, Injectable } from '@angular/core';
import { Category } from './category.model';
import { CacheService } from '../../../core/cache.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryCacheService {
  private cacheService = inject(CacheService<Category[]>);
  private readonly cacheKey = 'categories';

  getAll(): Category[] {
    return this.cacheService.get(this.cacheKey);
  }

  setAll(categories: Category[]) {
    this.cacheService.set(this.cacheKey, categories);
  }
}
