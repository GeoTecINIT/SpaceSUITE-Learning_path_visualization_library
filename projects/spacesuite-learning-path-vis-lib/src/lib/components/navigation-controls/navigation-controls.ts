import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lp-navigation-controls',
  imports: [CommonModule],
  templateUrl: './navigation-controls.html',
  styleUrl: './navigation-controls.css',
})
export class NavigationControlsComponent {
  @Input({ required: true }) currentIndex!: number;
  @Input({ required: true }) total!: number;
  @Output() prev = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();
  @Output() goTo = new EventEmitter<number>();

  get canGoPrev() {
    return this.currentIndex > 0;
  }
  get canGoNext() {
    return this.currentIndex < this.total - 1;
  }
  get dotsArray() {
    return Array.from({ length: this.total });
  }
}
