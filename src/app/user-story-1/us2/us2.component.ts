import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GetBugsService } from '../get-bugs.service';
import { PostBugsService } from '../post-bugs.service';
import { Bugs } from '../us1/Bugs';


@Component({
  selector: 'app-us2',
  templateUrl: './us2.component.html',
  styleUrls: ['./us2.component.scss']
})
export class Us2Component implements OnInit {
   param : string;

  constructor(private postBugsService:PostBugsService ,private route:ActivatedRoute , private router:Router , private getBugsService:GetBugsService) {
    this.param =this.route.snapshot.params.id
    
   }


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

    this.getBugsService.getBug(this.param).subscribe(data => {
      this.form.controls['title'].setValue(data.title),
      this.form.controls['description'].setValue(data.description),
      this.form.controls['priority'].setValue(data.priority),
      this.form.controls['status'].setValue(data.status),
      this.form.controls['reporter'].setValue(data.reporter)
    });


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
      console.log(data)
      this.router.navigate(['buglist/'])});
  }
   

}
