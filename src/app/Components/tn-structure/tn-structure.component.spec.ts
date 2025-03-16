import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TNStructureComponent } from './tn-structure.component';

describe('TNStructureComponent', () => {
  let component: TNStructureComponent;
  let fixture: ComponentFixture<TNStructureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TNStructureComponent]
    });
    fixture = TestBed.createComponent(TNStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
