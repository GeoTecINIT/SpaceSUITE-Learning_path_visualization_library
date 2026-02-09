import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  AfterViewInit,
  ViewChildren,
  signal,
  Output,
  computed,
} from '@angular/core';
import {
  ElementRef,
  ChangeDetectorRef,
  QueryList,
  HostListener,
  EventEmitter,
} from '@angular/core';
import { NgStyle, CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';

import {
  LearningPath,
  Course,
  LearningPathStyleConfig,
  Concept,
  LearningObjective,
} from '../../models';
import { DEFAULT_STYLE_CONFIG } from '../../utils';

@Component({
  selector: 'spacesuite-learning-path',
  standalone: true,
  imports: [NgStyle, CommonModule, ReactiveFormsModule],
  templateUrl: './learning-path-v1.component.html',
  styleUrl: './learning-path-v1.component.scss',
})
export class LearningPathV1Component implements OnChanges, AfterViewInit {
  @Input({ required: true }) data!: LearningPath;
  @Input() activePath: LearningPath | null = null;

  activeCourse = signal<Course | undefined>(undefined);

  @Output() clickCourseEvent = new EventEmitter<Course>();
  @Output() changeActivePathEvent = new EventEmitter<LearningPath>();
  @Output() viewCourseEvent = new EventEmitter<Course>();

  activeTooltip: string | null = null;
  tooltipX = 0;
  tooltipY = 0;

  // computed positions
  coursesMap = new Map<string, Course & { left: number; top: number }>();

  @Input() styleConfig: LearningPathStyleConfig = DEFAULT_STYLE_CONFIG;

  isExpanded = false;

  toggleCourse() {
    this.isExpanded = !this.isExpanded;
  }

  // Pan & Zoom state
  scale = 1;
  minScale = 0.5;
  maxScale = 3;

  translateX = 0;
  translateY = 0;

  private isDragging = false;
  private dragStartX = 0;
  private dragStartY = 0;
  private dragLastX = 0;
  private dragLastY = 0;

  selectedCourse: Course | null = null;

  concepts = computed(() => {
    const concepts: Concept[] = [];
    this.data.concepts.map((concept) => {
      if (!concept.id) {
        concept.id = uuidv4();
      }
      concepts.push(concept);
    });
    return concepts;
  });

  courses = computed(() => {
    const courses = this.data.courses || [];
    return courses.map((course) => {
      course.progress = course.progress || 0; // Ensure progress is defined
      course.completed = course.completed || course.progress === 100; // Mark as completed if progress is 100%
      const updatedCourse = { ...course, id: course.id || uuidv4() };
      updatedCourse.learning_objectives = updatedCourse.learning_objectives?.map((objective) => {
        const objectiveConcepts =
          objective.concepts
            ?.map((concept) =>
              this.concepts().find((c) => c.uri === concept.uri || c.id === concept.id),
            )
            .filter((c): c is Concept => !!c) || [];

        const updatedObjective = {
          ...objective,
          id: objective.id || uuidv4(),
          concepts: objectiveConcepts,
        };
        return updatedObjective;
      });
      return updatedCourse;
    });
  });

  @ViewChildren('cardElem', { read: ElementRef }) cardElems!: QueryList<ElementRef<HTMLDivElement>>;
  @ViewChildren('panZoomWrapper', { read: ElementRef }) panZoomWrapper!: QueryList<
    ElementRef<HTMLDivElement>
  >;

  constructor(
    private cdr: ChangeDetectorRef,
    private host: ElementRef,
  ) {}

  ngAfterViewInit() {
    this.data.id = this.data.id || uuidv4();
    // position compute after view init if needed
    this.computePositions();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) this.computePositions();

    if (changes['styleConfig']) this.computePositions();
  }

  computePositions() {
    this.coursesMap.clear();
    if (!this.data) return;
    let i = 0;
    for (const n of this.data.courses || []) {
      const left = i * (this.styleConfig.cardWidth + 85) + this.styleConfig.gap;
      const top = 0 * this.styleConfig.gap;
      n.id = n.id || uuidv4();
      this.coursesMap.set(n.id, { ...n, left, top });

      if (i > 0) {
        this.data.links = this.data.links || [];
        this.data.links.push({
          from: this.data.courses![i - 1].id!,
          to: n.id!,
          path: this.arrowPath(this.data.courses![i - 1].id!, n.id!),
        });
      }
      i++;
    }
  }

  arrowPath(fromId: string, toId: string) {
    const a = this.coursesMap.get(fromId);
    const b = this.coursesMap.get(toId);
    if (!a || !b) return '';
    const ax = a.left + this.styleConfig.cardWidth;
    const ay = a.top + this.styleConfig.cardHeight / 2;
    const bx = b.left - 5;
    const by = b.top + this.styleConfig.cardHeight / 2;

    // simple cubic bezier for nicer curves
    const dx = Math.abs(bx - ax);
    const hx = Math.max(this.styleConfig.cardHeight / 2, dx / 2);

    return `M ${ax} ${ay} C ${ax + hx} ${ay} ${bx - hx} ${by} ${bx} ${by}`;
  }

  onCourseClick(course: Course, event: MouseEvent) {
    event.stopPropagation();
    this.activeTooltip = null;
    // Highlight clicked card
    this.activeCourse.set(course);
    this.activePath = this.data;

    this.clickCourseEvent.emit(course);
    this.changeActivePathEvent.emit(this.data);
  }

  onCourseHover(course: Course, event: MouseEvent) {
    event.stopPropagation();
    this.activeTooltip = `${course.label} - ${course.description || ''}`;
    this.tooltipX = event.clientX + 12;
    this.tooltipY = event.clientY + 12;
  }

  onCourseHoverOut(course: Course, event: MouseEvent) {
    event.stopPropagation();
    this.activeTooltip = null;
  }

  onBackgroundClick() {
    this.activeTooltip = null;
  }

  getCourseById(id: string): Course | undefined {
    return this.data.courses?.find((n) => n.id === id);
  }

  // Mouse wheel zoom
  onWheel(event: WheelEvent) {
    event.preventDefault();

    // Zoom factor per wheel notch
    const zoomFactor = 0.1;
    let newScale = this.scale - event.deltaY * zoomFactor * 0.01;

    newScale = Math.min(this.maxScale, Math.max(this.minScale, newScale));

    // To zoom centered on mouse position, calculate translate offsets:
    const containerEl = this.host.nativeElement.querySelector('.container') as HTMLElement;
    if (!containerEl) return;

    const rect = containerEl.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    // Calculate position in SVG coords before and after zoom
    const svgXBefore = mouseX / this.scale - this.translateX;
    const svgYBefore = mouseY / this.scale - this.translateY;

    this.scale = newScale;

    const svgXAfter = mouseX / this.scale - this.translateX;
    const svgYAfter = mouseY / this.scale - this.translateY;

    // Adjust translate to keep focus point stable
    this.translateX += svgXAfter - svgXBefore;
    this.translateY += svgYAfter - svgYBefore;

    this.computePositions();
  }

  // Mouse drag for pan
  onPointerDown(event: PointerEvent) {
    event.preventDefault();
    this.isDragging = true;
    this.dragStartX = event.clientX;
    this.dragStartY = event.clientY;
    this.dragLastX = this.translateX;
    this.dragLastY = this.translateY;

    const containerEl = this.host.nativeElement.querySelector('.container');
    if (containerEl) containerEl.classList.add('dragging');
  }

  onPointerMove(event: PointerEvent) {
    if (!this.isDragging) return;

    event.preventDefault();
    const dx = (event.clientX - this.dragStartX) / this.scale;
    const dy = (event.clientY - this.dragStartY) / this.scale;

    this.translateX = this.dragLastX + dx;
    this.translateY = this.dragLastY + dy;

    this.computePositions();
  }

  onPointerUp(event: PointerEvent) {
    const containerEl = this.host.nativeElement.querySelector('.container');
    if (containerEl) containerEl.classList.remove('dragging');

    if (this.isDragging) {
      event.preventDefault(); // prevent click after drag
    }

    this.isDragging = false;
  }

  onViewCourse(course: Course, event: MouseEvent) {
    event.stopPropagation();
    this.selectedCourse = course;
    this.viewCourseEvent.emit(course);
  }

  getConcepts(course: Course): Concept[] {
    let concepts = [];
    for (let obj of course?.learning_objectives || []) {
      for (let concept of obj.concepts || []) {
        concepts.push(concept);
      }
    }
    return Array.from(new Set(concepts));
  }

  @HostListener('document:click', ['$event'])
  clearCards(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest(`#path-${this.activePath?.id}`)) {
      this.activeCourse.set(undefined);
    }

    if (this.data.id !== this.activePath?.id) {
      this.activeCourse.set(undefined);
    }
  }

  getConceptsForObjective(course: Course, objective: LearningObjective): Concept[] {
    return this.concepts().filter((concept) => objective.conceptIds?.includes(concept.id ?? ''));
  }

  getConceptsForCourse(course: Course): Concept[] {
    const courseConcepts = new Set<Concept>();
    course.learning_objectives?.forEach((objective) => {
      this.getConceptsForObjective(course, objective).forEach((concept) =>
        courseConcepts.add(concept),
      );
    });
    return Array.from(courseConcepts);
  }

  getTotalLearningObjectives(): number {
    return this.courses().reduce((total, course) => {
      return total + (course.learning_objectives?.length || 0);
    }, 0);
  }

  getTotalDuration(): string | undefined {
    let totalHours = 0;
    this.courses().forEach((course) => {
      // Assuming duration is in the format "X weeks" or "Y days" or "Z hours" or "N months"
      const duration = course.duration || '';
      const match = duration.match(/(\d+)\s*(week|day|hour|month)s?/i);
      if (match) {
        const value = parseInt(match[1], 10);
        const unit = match[2].toLowerCase();
        switch (unit) {
          case 'hour':
            totalHours += value;
            break;
          case 'day':
            totalHours += value * 8; // Assuming 1 day = 8 hours
            break;
          case 'week':
            totalHours += value * 40; // Assuming 1 week = 40 hours
            break;
          case 'month':
            totalHours += value * 160; // Assuming 1 month = 160 hours
            break;
        }
      }
    });
    if (totalHours === 0) {
      return undefined;
    }
    // If totalHours is less than 1, return in minutes
    if (totalHours < 1) {
      const totalMinutes = Math.round(totalHours * 60);
      return `${totalMinutes} minutes`;
    }
    // If totalHours is more than 40, return in weeks
    if (totalHours >= 40) {
      const totalWeeks = Math.round(totalHours / 40);
      return `${totalWeeks} week${totalWeeks > 1 ? 's' : ''}`;
    }
    // If totalHours is more than 160, return in months
    if (totalHours >= 160) {
      const totalMonths = Math.round(totalHours / 160);
      return `${totalMonths} month${totalMonths > 1 ? 's' : ''}`;
    }
    // Otherwise, return in hours
    return `${totalHours} hours`;
  }

  getDifficultyColor(difficulty: string): string {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'intermediate':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'advanced':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  }
}
