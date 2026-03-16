import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Course, DIFFICULTY_CONFIG } from '../../models';

@Component({
  selector: 'lp-difficulty-badge',
  imports: [CommonModule],
  templateUrl: './difficulty-badge.html',
  styleUrl: './difficulty-badge.css',
})
export class DifficultyBadgeComponent {
  @Input({ required: true }) difficulty!: Course['difficulty'];

  get config() {
    return DIFFICULTY_CONFIG[this.difficulty];
  }
}
