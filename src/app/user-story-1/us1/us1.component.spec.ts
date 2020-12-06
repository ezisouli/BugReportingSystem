import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Us1Component } from './us1.component';

describe('Us1Component', () => {
  let component: Us1Component;
  let fixture: ComponentFixture<Us1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Us1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Us1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
