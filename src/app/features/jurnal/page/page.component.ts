import { Component, inject, OnInit } from '@angular/core';
import { MainService } from '../main/main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page',
  imports: [],
  templateUrl: './page.component.html',
  styleUrl: './page.component.css',
})
export class PageComponent implements OnInit {
  private router = inject(Router);
  private mainService = inject(MainService);
  journal = this.mainService.selectedJournal;

  ngOnInit(): void {
    this.journal = this.mainService.selectedJournal;
  }

  goBack() {
    this.router.navigate(['/main']);
  }
}
