import { Component, Input, Output, EventEmitter, AfterViewInit, OnInit, ElementRef, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Drawer } from 'flowbite';
import type { DrawerOptions, DrawerInterface } from 'flowbite';
import type { InstanceOptions } from 'flowbite';

import {Concept, Course} from '../../../../dist/spacesuite-learning-path-vis-lib';


@Component({
  selector: 'lib-course-component',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './course.component.html',
  styleUrl: './course.component.css',
})
export class CourseComponent implements OnInit {
  @Input() course!: Course | null;

  @Output() close = new EventEmitter<void>();

  private drawer: DrawerInterface | null = null;

  constructor(private host: ElementRef) {}

  ngOnInit(): void {
    const containerEl = this.host.nativeElement.querySelector('#course-component') as HTMLElement;
    if (containerEl) {
      // options with default values
      const options: DrawerOptions = {
          placement: 'right',
          backdrop: true,
          bodyScrolling: false,
          edge: false,
          edgeOffset: '',
          backdropClasses:
              'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-30',
      };

      // instance options object
      const instanceOptions: InstanceOptions = {
        id: 'course-component',
        override: true
      };

      this.drawer = new Drawer(containerEl, options, instanceOptions);

    };
  }

  hide() {
    this.drawer?.hide()
    this.close.emit();
  }

  show() {
    this.drawer?.show();
  }

  getConcepts() : Concept[]{
    let concepts = []
    for(let obj of this.course?.learning_objectives || []){
      for (let concept of obj.concepts || []) {
        concepts.push(concept);
      }
    }
    return Array.from(new Set(concepts));
  }
}
