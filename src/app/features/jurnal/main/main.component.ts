import { Component, inject } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  imports: [CardComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {
  private router = inject(Router);

  goToNewJurnal() {
    this.router.navigate(['/new-jurnal']);
  }
}
