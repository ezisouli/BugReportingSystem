import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bugs } from './us1/Bugs';

@Injectable({
  providedIn: 'root'
})

export class GetBugsService {

  constructor(private http:HttpClient) { }

  url:string = "https://bug-report-system-server.herokuapp.com/bugs";

  getBugs():Observable<Bugs[]>{
    return this.http.get<Bugs[]>(this.url);
  }

  getBugsSorted(header:string,order:string):Observable<Bugs[]>{
    return this.http.get<Bugs[]>("https://bug-report-system-server.herokuapp.com/bugs?sort="+header+","+order);
  }
  
  getBugById(id: string):Observable<Bugs>{
    return this.http.get<Bugs>(this.url+'/'+id);
  }

  
}
