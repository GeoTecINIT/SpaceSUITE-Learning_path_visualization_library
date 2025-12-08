import {
  Component, Input, ViewChildren, OnChanges, SimpleChanges,
  ElementRef,QueryList, HostListener, AfterViewInit,
  Output, EventEmitter
} from '@angular/core';
import { CommonModule, NgStyle } from '@angular/common';
import { v4 as uuidv4 } from 'uuid';
import { ReactiveFormsModule } from '@angular/forms';

import { Concept, Course, LearningPath, LearningPathStyleConfig } from '../../models';
import { DEFAULT_STYLE_CONFIG } from '../../utils';

@Component({
  selector: 'spacesuite-learning-paths',
  standalone: true,
  imports: [NgStyle, CommonModule, ReactiveFormsModule],
  templateUrl: './learning-paths.component.html',
  styleUrl: './learning-paths.component.css',
})
export class LearningPathsComponent implements OnChanges, AfterViewInit {
  @Input({ required: true }) learningPaths!: LearningPath[];

  @Input() styleConfig: LearningPathStyleConfig = DEFAULT_STYLE_CONFIG;

  @Output() clickCourseEvent = new EventEmitter<Course>();
  @Output() changeActivePathEvent = new EventEmitter<string | undefined>();
  @Output() viewCourseEvent      = new EventEmitter<Course>();

   /** Map: pathId → nodeId → ElementRef */
  private cardElementRefs: Record<string, Record<string, ElementRef>> = {};

  /** Collect all card elements after rendering */
  @ViewChildren('cardEl') cardQuery!: QueryList<ElementRef>;

  /** Tooltip */
  activeTooltip: { pathId: string; nodeId: string; text: string; x: number; y: number } | null = null;

  /** Selected card highlight */
  selectedCard: { pathId: string; nodeId: string } | null = null;

  selectedCourse: Course | null = null;
  selectedPath: LearningPath | null = null;

  /** Pan state (per path) */
  private isPanning: Record<string, boolean> = {};
  private panStartPos: Record<string, { x: number; y: number }> = {};
  private panInitialTranslate: Record<string, { x: number; y: number }> = {};

  minScale = 0.5;
  maxScale = 3;

  // computed positions
  coursesMap = new Map<string, Course & { left: number; top: number; }>();

  constructor(private host: ElementRef) {}

  ngAfterViewInit() {
    // Build element map after rendering

    this.computePositions();
    // this.mapCardElements();
    // this.updateAllPaths();

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['learningPaths']) this.computePositions();

    if(changes['styleConfig']) this.computePositions();
  }

  computePosition(path: LearningPath) {
    if (!path) return;

    path.id = path.id || uuidv4();
    path.scale = path.scale || 1;
    path.translateX = path.translateX || 0;
    path.translateY = path.translateY || 0;

    let i = 0;
    for (const n of path.courses || []) {
      n.id = n.id || uuidv4();

      const left = (i * (this.styleConfig.cardWidth + 85)) +  this.styleConfig.gap;
      const top = 0 * this.styleConfig.gap;
      n.x = left;
      n.y = top;

      this.coursesMap.set(n.id, { ...n, left, top });

      if (i > 0) {
        path.links = path.links || [];
        path.links?.push({
          from: path.courses![i - 1].id!,
          to: n.id!,
          path: this.arrowPath(path.courses![i - 1].id!, n.id!)
        } );
      }
      i++;
    }

  }
  computePositions() {
    if (!this.learningPaths) return;

    this.coursesMap.clear();

    let j = 0;
    for (const l of this.learningPaths || []) {
      this.computePosition(l);
      j++;
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

  getConcepts(course : Course) : Concept[]{
    let concepts = []
    for(let obj of course?.learning_objectives || []){
      for (let concept of obj.concepts || []) {
        concepts.push(concept);
      }
    }
    return Array.from(new Set(concepts));
  }

  /** Background click clears selection */
  onBackgroundClick(path: LearningPath) {
    console.log(path);
    this.selectedCard = null;
    this.activeTooltip = null;
  }

  /** Card click */
  onCardClick(course: Course, path: LearningPath, event: MouseEvent) {
    event.stopPropagation();

    if (!path.id) return;

    this.selectedCard = { pathId: path.id, nodeId: course.id || "" };
    this.selectedPath = path;

    this.clickCourseEvent.emit(course);
    this.changeActivePathEvent.emit(path.id);

  }

  onViewCourse(course: Course, event: MouseEvent) {
    event.stopPropagation();
    this.selectedCourse = course;
    this.viewCourseEvent.emit(course);
  }

  /** Zoom handler */
  onWheel(event: WheelEvent, path: LearningPath) {
    event.preventDefault();
    if (!path) return;

    // Zoom factor per wheel notch
    const zoomFactor = 0.1;
    let newScale = (path.scale || 1) - event.deltaY * zoomFactor * 0.01;

    newScale = Math.min(this.maxScale, Math.max(this.minScale, newScale));

    // To zoom centered on mouse position, calculate translate offsets:
    const containerEl = this.host.nativeElement.querySelector('.container') as HTMLElement;
    if (!containerEl) return;

    const rect = containerEl.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    // Calculate position in SVG coords before and after zoom
    const svgXBefore = (mouseX / (path.scale || 1)) - (path.translateX || 0);
    const svgYBefore = (mouseY / (path.scale || 1)) - (path.translateY || 0);

    path.scale = newScale;

    const svgXAfter = (mouseX / path.scale) - (path.translateX || 0);
    const svgYAfter = (mouseY / path.scale) - (path.translateY || 0);

    // Adjust translate to keep focus point stable
    path.translateX = (path.translateX || 0) + (svgXAfter - svgXBefore);
    path.translateY = (path.translateY || 0) + (svgYAfter - svgYBefore);

    this.computePosition(path);
  }

  onCourseHover(path: LearningPath, course: Course, event: MouseEvent) {
    event.stopPropagation();
    if (!path.id) return;

    this.activeTooltip = {
      pathId: path.id,
      nodeId: course.id || "",
      text: course.description || "",
      x: event.clientX + 12,
      y: event.clientY + 12,
    };
  }

  onCourseHoverOut(path: LearningPath, course: Course, event: MouseEvent) {
    event.stopPropagation();
    this.activeTooltip = null;
  }

    /** Start panning */
  onPointerDown(event: PointerEvent, path: LearningPath) {
    if (!path) return;
    const target = event.target as HTMLElement;

    // Avoid blocking card click
    if (target.closest('.card')) return;

    event.preventDefault();

    if (!path.id) return;

    this.isPanning[path.id] = true;
    this.panStartPos[path.id] = { x: event.clientX, y: event.clientY };

    this.panInitialTranslate[path.id] = {
      x: path.translateX || 0,
      y: path.translateY || 0,
    };
  }

  /** Pan movement */
  onPointerMove(event: PointerEvent, path: LearningPath) {
    event.preventDefault();
    const pid = path.id;
    if (!pid) return;
    if (!this.isPanning[pid]) return;

    const start = this.panStartPos[pid];
    const initial = this.panInitialTranslate[pid];

    path.translateX = initial.x + (event.clientX - start.x);
    path.translateY = initial.y + (event.clientY - start.y);

    this.computePosition(path);
  }

  /** Stop panning */
  onPointerUp(event: PointerEvent, path: LearningPath) {
    event.preventDefault();
    if (!path.id) return;
    this.isPanning[path.id] = false;
  }

  /** Recalculate arrows when resizing */
  @HostListener('window:resize')
  onWindowResize() {
    this.computePositions();
  }

  private getPathIndex(path: LearningPath): number {
    return this.learningPaths.findIndex((p) => p.id == path.id)
  }
}
