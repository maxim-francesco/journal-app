import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { JurnalService } from './jurnal.service';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-jurnal',
  imports: [CommonModule, FormsModule],
  templateUrl: './jurnal.component.html',
  styleUrl: './jurnal.component.css',
})
export class JurnalComponent implements OnInit {
  ngOnInit(): void {
    this.jurnalService.ngOnInit();
  }

  //journal

  private router = inject(Router);
  private jurnalService = inject(JurnalService);

  categories = this.jurnalService.categories;
  title?: string;
  date?: string;

  notValidJurnal?: string;

  createNewJurnal() {
    if (this.title && this.date) {
      this.notValidJurnal = '';
      this.jurnalService.createNewJurnal(this.title!, this.date!, 'a');
      this.router.navigate(['./main']);
    } else {
      this.notValidJurnal = 'Enter title and date for the journal.';
    }
  }

  goBack() {
    this.router.navigate(['/main']);
  }

  //time

  getMaxDate() {
    return this.jurnalService.getMaxDate();
  }

  //categories
  selectedCategory = signal<string | null>(null);

  selectCategory(categoryName: string) {
    this.selectedCategory.set(
      this.selectedCategory() === categoryName ? null : categoryName
    );
  }
}
