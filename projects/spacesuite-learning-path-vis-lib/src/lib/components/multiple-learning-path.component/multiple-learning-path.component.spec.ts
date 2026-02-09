import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleLearningPathComponent } from './multiple-learning-path.component';

describe('MultipleLearningPathComponent', () => {
  let component: MultipleLearningPathComponent;
  let fixture: ComponentFixture<MultipleLearningPathComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultipleLearningPathComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MultipleLearningPathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
