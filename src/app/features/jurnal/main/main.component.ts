import { Component, inject, OnInit } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { Router } from '@angular/router';
import { JurnalCrudService } from '../services/jurnal-crud.service';
import { Journal } from '../services/jurnal.model';
import { MainService } from './main.service';

@Component({
  selector: 'app-main',
  imports: [CardComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent implements OnInit {
  private router = inject(Router);
  private mainService = inject(MainService);

  journals = this.mainService.journals;

  ngOnInit(): void {
    this.mainService.ngOnInit();
    this.journals = this.mainService.journals;
  }

  goToNewJurnal() {
    this.router.navigate(['/new-jurnal']);
  }
}
