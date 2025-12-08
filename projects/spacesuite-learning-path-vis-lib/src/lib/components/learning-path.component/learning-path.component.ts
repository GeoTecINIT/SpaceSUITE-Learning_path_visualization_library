import { Component, Input, OnChanges, SimpleChanges, AfterViewInit, ViewChildren, signal, Output } from '@angular/core';
import { ElementRef, ChangeDetectorRef, QueryList, HostListener, EventEmitter } from '@angular/core';
import { NgStyle, CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';

import { LearningPath, Course, LearningPathStyleConfig, Concept } from '../../models';
import { DEFAULT_STYLE_CONFIG } from '../../utils';

@Component({
  selector: 'spacesuite-learning-path',
  standalone: true,
  imports: [NgStyle, CommonModule, ReactiveFormsModule],
  templateUrl: './learning-path.component.html',
  styleUrl: './learning-path.component.scss',
})
export class LearningPathComponent implements OnChanges, AfterViewInit{

  @Input({ required: true }) data!: LearningPath;

  activeCardId = signal<string | undefined>(undefined);
  @Input() activePathId : string | undefined;

  @Output() clickCourseEvent      = new EventEmitter<string | undefined>();
  @Output() changeActivePathEvent = new EventEmitter<string | undefined>();
  @Output() viewCourseEvent       = new EventEmitter<Course>();

  activeTooltip: string | null = null;
  tooltipX = 0;
  tooltipY = 0;


  // computed positions
  coursesMap = new Map<string, Course & { left: number; top: number; }>();

  @Input() styleConfig: LearningPathStyleConfig = DEFAULT_STYLE_CONFIG;

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

  @ViewChildren('cardElem', { read: ElementRef }) cardElems!: QueryList<ElementRef<HTMLDivElement>>;
  @ViewChildren('panZoomWrapper', { read: ElementRef }) panZoomWrapper!: QueryList<ElementRef<HTMLDivElement>>;

  constructor(private cdr: ChangeDetectorRef, private host: ElementRef) {}

  ngAfterViewInit() {
    this.data.id = this.data.id || uuidv4();
    // position compute after view init if needed
    this.computePositions();
  }


  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) this.computePositions();

    if(changes['styleConfig']) this.computePositions();
  }

  computePositions() {
    this.coursesMap.clear();
    if (!this.data) return;
    let i = 0;
    for (const n of this.data.courses || []) {
      const left = (i * (this.styleConfig.cardWidth + 85)) +  this.styleConfig.gap;
      const top = 0 * this.styleConfig.gap;
      n.id = n.id || uuidv4();
      this.coursesMap.set(n.id, { ...n, left, top });

      if (i > 0) {
        this.data.links = this.data.links || [];
        this.data.links.push({
          from: this.data.courses![i - 1].id!,
          to: n.id!,
          path: this.arrowPath(this.data.courses![i - 1].id!, n.id!)
        } );
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
    this.activeCardId.set(course.id);
    this.activePathId = this.data.id;

    this.clickCourseEvent.emit(course.id);
    this.changeActivePathEvent.emit(this.data.id);
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
    return this.data.courses?.find(n => n.id === id);
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
    const svgXBefore = (mouseX / this.scale) - this.translateX;
    const svgYBefore = (mouseY / this.scale) - this.translateY;

    this.scale = newScale;

    const svgXAfter = (mouseX / this.scale) - this.translateX;
    const svgYAfter = (mouseY / this.scale) - this.translateY;

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

  getConcepts(course : Course) : Concept[]{
      let concepts = []
      for(let obj of course?.learning_objectives || []){
        for (let concept of obj.concepts || []) {
          concepts.push(concept);
        }
      }
      return Array.from(new Set(concepts));
  }

  @HostListener('document:click', ['$event'])
  clearCards(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest(`#path-${this.activePathId}`)) {
      this.activeCardId.set(undefined);
    }

    if(this.data.id !== this.activePathId) {
      this.activeCardId.set(undefined);
    }
  }
}
