import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {  HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';




import { DataFormComponent } from './dataForm.component';
import { FormBuilder, FormsModule } from '@angular/forms';

fdescribe('DataFormComponent', () => {
  let component: DataFormComponent;
  let fixture: ComponentFixture<DataFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataFormComponent ],
      imports:[
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers:[
        FormBuilder
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Form is invalid', () => {
    expect(component.form.invalid).toBeTruthy();
  });

  it('Form is valid', () => {
    const titleControl = component.form.get('title');
    const descriptionControl = component.form.get('description');
    const priorityControl = component.form.get('priority');
    const reporterControl = component.form.get('reporter');
    const statusControl = component.form.get('status');

    titleControl.setValue('bug1');
    expect(titleControl.valid).toBeTruthy();

    descriptionControl.setValue('bug1 done');
    expect(descriptionControl.valid).toBeTruthy();

    priorityControl.setValue(1);
    expect(priorityControl.valid).toBeTruthy();

    reporterControl.setValue('QA');
    expect(reporterControl.valid).toBeTruthy();

    statusControl.setValue('Done');
    expect(statusControl.valid).toBeTruthy();

    expect(component.form.valid).toBeTruthy();
  });

});
