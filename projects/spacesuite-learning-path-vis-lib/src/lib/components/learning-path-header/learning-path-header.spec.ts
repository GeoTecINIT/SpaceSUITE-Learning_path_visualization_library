import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningPathHeaderComponent } from './learning-path-header';

describe('LearningPathHeaderComponent', () => {
  let component: LearningPathHeaderComponent;
  let fixture: ComponentFixture<LearningPathHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearningPathHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LearningPathHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
