import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bugs } from '../dataTable/Bugs';

@Injectable({
  providedIn: 'root'
})
export class DeleteBugsService {

  constructor(private http:HttpClient) { }

  url:string = "https://bug-report-system-server.herokuapp.com/bugs";
  
  deleteBug(bugs:Bugs):Observable<{}>{
    return this.http.delete(this.url+'/'+bugs.id);
  }

  
}
