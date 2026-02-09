import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningPathV1Component } from './learning-path-v1.component';

describe('LearningPathV1Component', () => {
  let component: LearningPathV1Component;
  let fixture: ComponentFixture<LearningPathV1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearningPathV1Component],
    }).compileComponents();

    fixture = TestBed.createComponent(LearningPathV1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
