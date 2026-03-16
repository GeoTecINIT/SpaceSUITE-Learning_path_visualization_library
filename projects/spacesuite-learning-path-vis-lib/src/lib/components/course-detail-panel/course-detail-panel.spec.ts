import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseDetailPanelComponent } from './course-detail-panel';

describe('CourseDetailPanelComponent', () => {
  let component: CourseDetailPanelComponent;
  let fixture: ComponentFixture<CourseDetailPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseDetailPanelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseDetailPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
