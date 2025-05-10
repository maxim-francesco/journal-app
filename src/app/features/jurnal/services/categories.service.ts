import { Injectable } from '@angular/core';
import { RealtimeDatabaseService } from '../../../core/realtime-database.service';
import { Category } from './category.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private collectionName = 'categories';
  private defaultCategories: Category[] = [
    { name: 'Personal' },
    { name: 'Work' },
    { name: 'Travel' },
    { name: 'Health' },
    { name: 'Ideas' },
  ];

  constructor(private dbService: RealtimeDatabaseService<Category>) {}

  /**
   * Retrieves all categories from the /categories path.
   * @returns Observable of Category array.
   */
  getAllCategories(): Observable<Category[]> {
    return this.dbService.getAll(this.collectionName);
  }

  /**
   * Sets default categories if none exist at the /categories path.
   * @returns Promise that resolves when default categories are set.
   */
  async setDefaultCategories(): Promise<void> {
    try {
      // Check if categories already exist
      const categories = await this.dbService
        .getAll(this.collectionName)
        .toPromise();
      if (!categories || categories.length === 0) {
        // Add each default category
        for (const category of this.defaultCategories) {
          await this.dbService.add(this.collectionName, category);
        }
      }
    } catch (error) {
      console.error('Failed to set default categories:', error);
      throw new Error('Could not set default categories');
    }
  }
}
