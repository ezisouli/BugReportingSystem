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
    return this.http.post<Bugs>(this.url,bugs);
  }

  updateBug(bugs:Bugs):Observable<void>{
    return this.http.put<void>(this.url+'/'+bugs.id,bugs);
  }

}
