import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bugs } from './us1/Bugs';


@Injectable({
  providedIn: 'root'
})
export class PostBugsService {

  constructor(private http:HttpClient) { }

  url:string = "https://bug-report-system-server.herokuapp.com/bugs";
  
  postBug(bugs:Bugs):Observable<Bugs>{
   
    //Since we are sending data as JSON
    //const headers = { 'content-type': 'application/json'};
    
    //JSON.stringify(bugs) converts the bugs object into a JSON string
    //const body=JSON.stringify(bugs);  

    //return this.http.post<Bugs>(this.url,body,{'headers':headers});
    return this.http.post<Bugs>(this.url,bugs);
  }

}
