import { CommonModule } from '@angular/common';
import { Component, HostListener, inject, input } from '@angular/core';
import { Journal } from '../services/jurnal.model';
import { TimeService } from '../../../core/time.service';
import { Router } from '@angular/router';
import { MainService } from '../main/main.service';
import { JurnalCrudService } from '../services/jurnal-crud.service';
import { JournalPdfExportService } from '../services/journal-pdf-export.service';
import { JournalCacheService } from '../services/journal-cache.service';
import { ConnectivityService } from '../../../core/connectivity.service';

@Component({
  selector: 'app-card',
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  //journal

  private jurnalCrudService = inject(JurnalCrudService);
  private journalCacheService = inject(JournalCacheService);
  private connectivityService = inject(ConnectivityService);
  journal = input.required<Journal>();

  delete() {
    if (this.connectivityService.isOnline()) {
      this.jurnalCrudService.deleteJournal(this.journal().id!);
    } else {
      this.journalCacheService.deleteJournal(this.journal());
    }
    this.mainService.ngOnInit();
  }

  //menu

  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (
      this.isMenuOpen &&
      !target.closest('.text-3xl') &&
      !target.closest('.absolute')
    ) {
      this.isMenuOpen = false;
    }
  }

  //time

  private timeService = inject(TimeService);

  getTime() {
    return this.timeService.getRelativeTime(this.journal().date!);
  }

  //routing

  private router = inject(Router);
  private mainService = inject(MainService);

  goToPage() {
    this.mainService.setJournal(this.journal());
    this.router.navigate(['/page']);
  }

  //export to pdf

  private journalPdfExportService = inject(JournalPdfExportService);

  export() {
    this.journalPdfExportService.exportJournal(this.journal());
  }
}
