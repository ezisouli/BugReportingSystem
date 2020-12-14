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

  header:string;
  clicked:boolean[]=[false,false,false,false,false];
  sort:string[] =["desc","asc"];
  sorting:string;


  ngOnInit(): void {

    this.getBugsService.getBugs().subscribe(
      (data) => {
        this.bugs = data;
    }) 

  }

  getHeader(thesi:number){
    this.header = this.fields[thesi];
    this.clicked[thesi] = !this.clicked[thesi];
    if(this.clicked[thesi]){
      this.sorting =this.sort[1];
    }
    else{this.sorting =this.sort[0];}
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

  deleteBug(bug : Bugs, index: number){
    console.log(bug.id);

    this.deleteBugsService.deleteBug(bug).subscribe(
      () => {
        //this.bugs[this.bugs.indexOf(this.selectedbug)] = bug;
        this.bugs.splice(index,1);
        //console.log(index);
      
        
    })
    //this.router.navigate(['buglist/']);
  

  /*deleteBug(item: Bugs) {
    this.bugs = []
    this.deleteBug.deleteBugs(bug.id).subscribe() => {
    this.bugs.push()}}

*/
}
