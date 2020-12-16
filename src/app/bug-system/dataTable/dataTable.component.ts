import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeleteBugsService } from '../Services/delete-bugs.service';
import { GetBugsService } from '../Services/get-bugs.service';
import { Bugs } from './Bugs';


@Component({
  selector: 'app-dataTable',
  templateUrl: './dataTable.component.html',
  styleUrls: ['./dataTable.component.scss']
})
export class DataTableComponent implements OnInit {
  

  constructor(private getBugsService:GetBugsService ,
     private route:ActivatedRoute ,
     private router:Router,
     private deleteBugsService:DeleteBugsService) { }

  columns = ["Title","Priority","Reporter", "Date Created", "Status"];
  fields =["title","priority","reporter","createdAt","status"];
  bugs : Bugs[] = [];
  bugTest :Bugs[] = [];

  header:string;
  clicked:boolean[]=[true,false,false,false,false];
  sort:string[] =["desc","asc"];
  sorting:string;

  //pagination
  page:number = 0;


  ngOnInit(): void {

    this.getBugsService.getBugs().subscribe(
      (data) => {
        this.bugs = data;
    }) 

  }

  //Sorting
  getHeader(thesi:number){
    this.header = this.fields[thesi];
    this.clicked[thesi] = !this.clicked[thesi];
    if(this.clicked[thesi]){
      this.sorting =this.sort[1];
    }
    else{this.sorting = this.sort[0];}
    console.log(this.header);
    console.log(this.sorting);
    console.log(this.clicked);
    
    this.getBugsService.getBugsSorted(this.header,this.sorting).subscribe(
      (data) => {
        this.bugs = data;
    })

  }
  
  editBug(bug : Bugs){
    this.router.navigate(['bugform', bug.id]);
    console.log(bug.id);
  }

  deleteBug(bug : Bugs){
    console.log(bug.id);
    this.deleteBugsService.deleteBug(bug).subscribe(
      () => {
        const index =this.bugs.indexOf(bug);
        this.bugs.splice(index,1);
        console.log(index);
  
    })
  }

  previousPage(){
    if(this.page>0){
      this.page--;
      this.getBugsService.getBugPage(this.page).subscribe(
        (data) => {
          this.bugs = data;
      })
    }
    console.log("page p",this.page);
  }

  nextPage(){

    this.getBugsService.getBugPage(this.page+1).subscribe(
      (data) => {
        this.bugTest = data;
    })

    

    console.log("length ",this.bugTest.length); 

    if(this.bugTest.length>0){
      this.page++;
      this.getBugsService.getBugPage(this.page).subscribe(
        (data) => {
          this.bugs = data;
      })
      console.log("page n",this.page);
    }
    
   
  }
 
}
