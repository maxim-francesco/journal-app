import { CommonModule } from '@angular/common';
import { Component, HostListener, input } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  title = input.required<string>();
  date = input.required<string>();

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
}
