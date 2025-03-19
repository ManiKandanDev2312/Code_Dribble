import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewTraineeComponent } from './review-trainee.component';

describe('ReviewTraineeComponent', () => {
  let component: ReviewTraineeComponent;
  let fixture: ComponentFixture<ReviewTraineeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewTraineeComponent]
    });
    fixture = TestBed.createComponent(ReviewTraineeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
