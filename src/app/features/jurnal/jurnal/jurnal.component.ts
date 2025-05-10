import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
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
export class JurnalComponent {
  //journal

  private router = inject(Router);
  private jurnalService = inject(JurnalService);

  title?: string;
  date?: string;

  createNewJurnal() {
    this.jurnalService.createNewJurnal(this.title!, this.date!, 'a');
    this.router.navigate(['./main']);
  }

  goBack() {
    this.router.navigate(['/main']);
  }

  //time

  getMaxDate() {
    return this.jurnalService.getMaxDate();
  }
}
