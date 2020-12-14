import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GetBugsService } from '../get-bugs.service';
import { PostBugsService } from '../post-bugs.service';
import { Bugs } from '../us1/Bugs';


@Component({
  selector: 'app-us2',
  templateUrl: './us2.component.html',
  styleUrls: ['./us2.component.scss']
})
export class Us2Component implements OnInit {
   
  priority = ['Minor','Major','Critical'];
  reporter = ['QA', 'PO', 'DEV'];
  status = ['Ready for testing', 'Done', 'Rejected'];

  param : string; 
  newBug:Bugs;
  form: FormGroup;

  constructor(private postBugsService:PostBugsService, private route:ActivatedRoute, private router:Router, 
    private getBugsService:GetBugsService, private fb:FormBuilder) {
    this.param =this.route.snapshot.params.id
    console.log("param");
    console.log(this.route.snapshot.params);
    
   }

  ngOnInit(): void {
    // this.form= new FormGroup({
    //   title: new FormControl(null, Validators.required),
    //   description: new FormControl(null, Validators.required),
    //   priority: new FormControl(null, Validators.required),
    //   reporter: new FormControl(null, Validators.required),
    //   status: new FormControl(null),
    //   comments: new FormArray([
    //     new FormGroup({
    //       Description: new FormControl(null),
    //       Reporter: new FormControl(null)
    //     })        
    //   ])
    // })

    this.form = this.fb.group({
      title:[null, Validators.required],
      description:[null, Validators.required],
      priority: [null, Validators.required],
      reporter: [null, Validators.required],
      status: [null],
      comments: this.fb.array([
        this.commentsItem(null,null)
      ])
    })

    

    this.getBugsService.getBugById(this.param).subscribe(data => {
      this.form.controls['title'].setValue(data.title),
      this.form.controls['description'].setValue(data.description),
      this.form.controls['priority'].setValue(data.priority),
      this.form.controls['status'].setValue(data.status),
      this.form.controls['reporter'].setValue(data.reporter)
      //this.form.controls['Description'].setValue(data.comments['reporter'])
      //this.form.controls['Reporter'].setValue(data.comments['description'])
     
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
  

  /*Create getter that returns the FormArray*/
  get comments() {
    return this.form.get('comments') as FormArray
  }

  private commentsItem(Reporter?:string,Description?:string){
    return this.fb.group({
      reporter:Reporter,
      description:Description
    })
  }

  /*Method to add comments*/
  addComments(){
    this.comments.push(this.commentsItem());
  }


  formSubmit():void {
    
    if (!this.form.valid){
    return;
    }

    //Created or updated bug
    this.newBug = this.form.value;
    this.newBug.id = this.param;
    console.log(this.newBug);

    //Check if bug existed or just created
    if(!this.newBug.id){
      this.postBugsService.postBug(this.newBug).subscribe( data => {
      console.log("post")
      this.router.navigate(['buglist/'])})
    }
    else{
      this.postBugsService.updateBug(this.newBug).subscribe( data => {
      console.log("put")
      this.router.navigate(['buglist/'])})
    }
  
  }

}
