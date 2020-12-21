import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DeleteBugsService } from '../Services/delete-bugs.service';
import { GetBugsService } from '../Services/get-bugs.service';
import { Bugs } from './Bugs';
import { faTrash,faSearch,faEdit,faBroom,faBug,faAngleLeft,faAngleRight} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dataTable',
  templateUrl: './dataTable.component.html',
  styleUrls: ['./dataTable.component.scss']
})
export class DataTableComponent implements OnInit {
  
  faTrash = faTrash;
  faSearch = faSearch;
  faEdit = faEdit;
  faBroom = faBroom;
  faBug = faBug;
  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;

  constructor(private getBugsService:GetBugsService ,
     private route:ActivatedRoute ,
     private router:Router,
     private deleteBugsService:DeleteBugsService) { }

  columns = ["Title","Priority","Reporter", "Date Created", "Status"];
  fields =["title","priority","reporter","createdAt","status"];
  bugs : Bugs[] = [];
  bugTest :Bugs[] = [];


  priority = ['Minor','Major','Critical'];
  reporter = ['QA', 'PO', 'DEV'];
  status = ['Ready for testing', 'Done', 'Rejected'];


  
  clicked:boolean[]=[true,false,false,false,false];
  sort:string[] =["desc","asc"];

  sorting:string = "";
  header:string  = "";
  page:number = 0;

  /*get values from search*/
  titleValue: string = '';
  priorityValue : any ='';  /*??????*/
  reporterValue: string = '';
  statusValue: string= '';

  listForm: FormGroup;


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
  
    this.getBugsService.getBugFullSearch(this.page,this.header,this.sorting,this.titleValue,
      this.priorityValue,this.reporterValue,this.statusValue).subscribe(
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
        const index = this.bugs.indexOf(bug);
        this.bugs.splice(index,1);
        console.log(index);

      //refresh the page
      this.getBugsService.getBugFullSearch(this.page,this.header,this.sorting,this.titleValue,
        this.priorityValue,this.reporterValue,this.statusValue).subscribe(
        (data) => {
          this.bugs = data;
      }) 
  
    })
    
  }

  previousPage(){
    if(this.page>0){
      this.page--;

      this.getBugsService.getBugFullSearch(this.page,this.header,this.sorting,this.titleValue,
        this.priorityValue,this.reporterValue,this.statusValue).subscribe(
        (data) => {
          this.bugs = data;
      })

    }
    console.log("page p",this.page);
  }

  nextPage(){
    this.getBugsService.getBugFullSearch(this.page+1,this.header,this.sorting,this.titleValue,
      this.priorityValue,this.reporterValue,this.statusValue).subscribe(
      (data) => {
        this.bugTest = data;

      console.log("length ",this.bugTest.length); 

      console.log("this header "+ this.header);
      console.log("this sorting "+ this.sorting);
      console.log("this page "+ this.page);

      if(this.bugTest.length>0){
            this.page++;
            this.getBugsService.getBugFullSearch(this.page,this.header,this.sorting,this.titleValue,
              this.priorityValue,this.reporterValue,this.statusValue).subscribe(
              (data) => {
                this.bugs = data;
            })
            console.log("page ",this.page);
          }

    })


  }

  
  searchBug(){
    /* page = 0 για να ξεκινάει από την πρώτη πάντα */
    this.page = 0;
    this.getBugsService.getBugFullSearch(this.page,this.header,this.sorting,this.titleValue,
      this.priorityValue,this.reporterValue,this.statusValue).subscribe(
      (data) => {
        this.bugs = data;
    })

    console.log(this.priorityValue);
  }

  clearBug(){
    this.titleValue = "";
    this.priorityValue = "";
    this.reporterValue = "";
    this.statusValue = "";
    this.searchBug();
  }
 
}
