import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { PostBugsService } from '../post-bugs.service';
import { Bugs } from '../us1/Bugs';


@Component({
  selector: 'app-us2',
  templateUrl: './us2.component.html',
  styleUrls: ['./us2.component.scss']
})
export class Us2Component implements OnInit {

  constructor(private postBugsService:PostBugsService ,private route:ActivatedRoute) { }


  form: FormGroup;
  priority = ['Minor','Major','Critical'];
  reporter = ['QA', 'PO', 'DEV'];
  status = ['Ready for testing', 'Done', 'Rejected'];
  newBug:Bugs;


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

      if (value ==='QA') {
        priorityFormControl.setValidators(Validators.required);
      }
      else{
        priorityFormControl.clearValidators();
      }
      priorityFormControl.updateValueAndValidity();

    })

  }

  formSubmit() {
    if (!this.form.valid){
    return;
    }
    
    this.newBug = this.form.value;
    console.log(this.newBug);
    this.postBugsService.postBug(this.newBug).subscribe( data => {
      console.log(data)});
  }
   

}
