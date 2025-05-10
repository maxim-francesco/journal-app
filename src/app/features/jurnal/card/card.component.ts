import { CommonModule } from '@angular/common';
import { Component, HostListener, inject, input } from '@angular/core';
import { Journal } from '../services/jurnal.model';
import { TimeService } from '../../../core/time.service';
import { Router } from '@angular/router';
import { MainService } from '../main/main.service';
import { JurnalCrudService } from '../services/jurnal-crud.service';

@Component({
  selector: 'app-card',
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  //journal

  private jurnalCrudService = inject(JurnalCrudService);
  journal = input.required<Journal>();

  delete() {
    this.jurnalCrudService.deleteJournal(this.journal().id!);
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
}
