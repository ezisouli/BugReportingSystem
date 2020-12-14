import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetBugsService } from '../get-bugs.service';
import { Bugs } from './Bugs';


@Component({
  selector: 'app-us1',
  templateUrl: './us1.component.html',
  styleUrls: ['./us1.component.scss']
})
export class Us1Component implements OnInit {
  

  constructor(private getBugsService:GetBugsService , private route:ActivatedRoute , private router:Router) { }

  columns = ["Title","Priority","Reporter", "Date Created", "Status"];
  fields =["title","priority","reporter","createdAt","status"];
  bugs : Bugs[] = [];

  header:string;
  clicked:boolean[]=[false,false,false,false,false];
  sort:string[] =["desc","asc"];
  sorting:string;

  //headerClicked:string =

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
  }


}
