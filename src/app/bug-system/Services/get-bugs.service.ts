import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bugs } from '../dataTable/Bugs';

@Injectable({
  providedIn: 'root'
})

export class GetBugsService {

  constructor(private http:HttpClient) { }

  url:string = "https://bug-report-system-server.herokuapp.com/bugs";

  getBugs():Observable<Bugs[]>{
    return this.http.get<Bugs[]>(this.url);
  }

  getBugById(id: string):Observable<Bugs>{
    return this.http.get<Bugs>(this.url+'/'+id);
  }

  getBugsSorted(header:string,order:string):Observable<Bugs[]>{
    return this.http.get<Bugs[]>(this.url+"?sort="+header+","+order);
  }

  getBugPage(page:number):Observable<Bugs[]>{
    return this.http.get<Bugs[]>(this.url+"?page="+page);
  }

  getBugsSearch(title:string,priority:number,reporter:string,status:string):Observable<Bugs[]>{
    return this.http.get<Bugs[]>(this.url+"?title="+ title +"&priority="+priority+"&reporter="+reporter+"&status="+status);
  }

  //get page and sorting
  getBugByPageAndSorting(page:number,header:string,order:string):Observable<Bugs[]>{
    if(header!=''){
      return this.http.get<Bugs[]>(this.url+"?page="+ page+"&sort="+header+","+order);
    }
    else{return this.http.get<Bugs[]>(this.url+"?page="+ page);}
  }

  getBugFullSearch(page:number,header:string,order:string,title:string,priority:number,reporter:string,status:string):Observable<Bugs[]>{
    if(header!=''){
      return this.http.get<Bugs[]>(this.url+"?title="+ title +"&priority="+priority+"&reporter="+reporter+"&status="+status+"&page="+ page+"&sort="+header+","+order);
    }
    else{
      return this.http.get<Bugs[]>(this.url+"?title="+ title +"&priority="+priority+"&reporter="+reporter+"&status="+"&page="+ page);
    }
  }

}
