import { Component, inject, OnInit } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { Router } from '@angular/router';
import { JurnalCrudService } from '../services/jurnal-crud.service';
import { Journal } from '../services/jurnal.model';

@Component({
  selector: 'app-main',
  imports: [CardComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent implements OnInit {
  private router = inject(Router);
  private jurnalCrudService = inject(JurnalCrudService);

  journals?: Journal[];

  ngOnInit(): void {
    this.jurnalCrudService.getAllJournals().subscribe((r) => {
      this.journals = r;
    });
  }

  goToNewJurnal() {
    this.router.navigate(['/new-jurnal']);
  }
}
