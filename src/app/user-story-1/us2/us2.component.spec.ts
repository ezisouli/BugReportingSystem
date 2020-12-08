import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Us2Component } from './us2.component';

describe('Us2Component', () => {
  let component: Us2Component;
  let fixture: ComponentFixture<Us2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Us2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Us2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
