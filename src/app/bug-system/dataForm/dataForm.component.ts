import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GetBugsService } from '../Services/get-bugs.service';
import { PostBugsService } from '../Services/post-bugs.service';
import { Bugs } from '../dataTable/Bugs';
import { Comments } from '../dataTable/Comments';


@Component({
  selector: 'app-dataForm',
  templateUrl:'./dataForm.component.html',
  styleUrls: ['./dataForm.component.scss']
})
export class DataFormComponent implements OnInit {
   
  priority = ['Minor','Major','Critical'];
  reporter = ['QA', 'PO', 'DEV'];
  status = ['Ready for testing', 'Done', 'Rejected'];

  param : string ; 
  newBug:Bugs;
  form: FormGroup;
  submitted = false;

  constructor(private postBugsService:PostBugsService, private route:ActivatedRoute, private router:Router, 
    private getBugsService:GetBugsService, private fb:FormBuilder) {
    this.param = this.route.snapshot.params.id
    console.log("param ",this.param);
    console.log(this.route.snapshot.params);
    
  }

  ngOnInit(): void  {

    this.form = this.fb.group({
      title:['', Validators.required],
      description:['', Validators.required],
      priority: ['', Validators.required],
      reporter: ['', Validators.required],
      status: [''],
      comments: this.fb.array([
        this.commentsItem('','')
      ])
    });

    if(this.param!=undefined){
      this.getBugsService.getBugById(this.param).subscribe(data => {
        this.form.controls['title'].setValue(data.title),
        this.form.controls['description'].setValue(data.description),
        this.form.controls['priority'].setValue(data.priority),
        this.form.controls['status'].setValue(data.status),
        this.form.controls['reporter'].setValue(data.reporter),
        this.form.setControl('comments',this.setExistingComments(data.comments))
        console.log("ok");
        console.log(data.comments)
      });
    }
   
    
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

  /* Set existing comments */
  setExistingComments(commentsSet : Comments[]):FormArray{
    const formArray = new FormArray([]);
    commentsSet.forEach( s => {
      formArray.push(this.fb.group({
        reporter:s.reporter,
        description:s.description
      }));
    })

    return formArray;
  }


  /* Method to add comments*/
  addComments():void{
    this.comments.push(this.commentsItem());
  }

  /* Method to delete comments*/
  removeComments(commentIndex:number):void{
    this.comments.removeAt(commentIndex);
    console.log(commentIndex)
  }


  /* Submit form */
  formSubmit():void {
    
    
    /* Show Validators on submit */
    this.submitted = true;
    
     // stop here if form is invalid
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
