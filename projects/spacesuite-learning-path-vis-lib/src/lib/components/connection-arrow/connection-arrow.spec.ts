import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionArrowComponent } from './connection-arrow';

describe('ConnectionArrowComponent', () => {
  let component: ConnectionArrowComponent;
  let fixture: ComponentFixture<ConnectionArrowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConnectionArrowComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConnectionArrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
