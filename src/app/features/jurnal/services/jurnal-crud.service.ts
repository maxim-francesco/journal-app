import { inject, Injectable } from '@angular/core';
import { RealtimeDatabaseService } from '../../../core/realtime-database.service';
import { Journal } from './jurnal.model';
import { Observable } from 'rxjs';
import { AuthService } from '../../../core/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class JurnalCrudService {
  private authService = inject(AuthService);
  private collectionName = `${this.authService.getUserId()}/journals`; // Firebase Realtime Database path

  constructor(private dbService: RealtimeDatabaseService<Journal>) {}

  // Get all journal entries
  getAllJournals(): Observable<Journal[]> {
    return this.dbService.getAll(this.collectionName);
  }

  // Get a single journal entry by ID
  getJournalById(id: string): Observable<Journal | undefined> {
    return this.dbService.getById(this.collectionName, id);
  }

  // Add a new journal entry
  async addJournal(journal: Omit<Journal, 'id'>): Promise<string> {
    return this.dbService.add(this.collectionName, journal);
  }

  // Update an existing journal entry
  async updateJournal(id: string, journal: Partial<Journal>): Promise<void> {
    return this.dbService.update(this.collectionName, id, journal);
  }

  // Delete a journal entry
  async deleteJournal(id: string): Promise<void> {
    return this.dbService.delete(this.collectionName, id);
  }
}
