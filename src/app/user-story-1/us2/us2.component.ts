import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-us2',
  templateUrl: './us2.component.html',
  styleUrls: ['./us2.component.scss']
})
export class Us2Component implements OnInit {

  constructor() { }

  form: FormGroup;
  priority=['minor', 'major', 'critical'];
  reporter=['QA', 'PO', 'DEV'];
  status=['ready for testing', 'done', 'rejected'];


  ngOnInit(): void {
    this.form= new FormGroup({
      title: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      priority: new FormControl(null, Validators.required),
      reporter: new FormControl(null, Validators.required),
      status: new FormControl(null)
    })
    this.form.get('reporter').valueChanges.subscribe(value=>{
      const priorityFormControl = this.form.get('status');
      if (value==='QA') {
        priorityFormControl.setValidators(Validators.required);
      }
      else{
        priorityFormControl.clearAsyncValidators();
      }
      priorityFormControl.updateValueAndValidity();
    })
  }
  

}