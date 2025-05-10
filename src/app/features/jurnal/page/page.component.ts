import { Component, inject, OnInit } from '@angular/core';
import { MainService } from '../main/main.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-page',
  standalone: true, // Assuming standalone component
  imports: [CommonModule, FormsModule],
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css'], // Corrected `styleUrl` to `styleUrls`
})
export class PageComponent implements OnInit {
  private router = inject(Router);
  private mainService = inject(MainService);
  journal = this.mainService.selectedJournal;

  textjurnal: string = ''; // Initialize with empty string

  ngOnInit(): void {
    this.journal = this.mainService.selectedJournal;
    // Set textjurnal to journal content if available, else use default text
    this.textjurnal =
      this.journal?.content || 'Start writing your journal here...';
  }

  saveToJournal() {
    if (!this.journal) {
      console.error('No journal selected');
      return;
    }
    const newJurnal = {
      id: this.journal.id,
      date: this.journal.date,
      content: this.textjurnal,
      title: this.journal.title,
      category: this.journal.category,
    };
    this.mainService.saveToJurnal(newJurnal);
    this.router.navigate(['/main']);
  }

  goBack() {
    this.router.navigate(['/main']);
  }
}
