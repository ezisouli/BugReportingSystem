import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {GetBugsService} from '../Services/get-bugs.service';
import {Bugs} from './Bugs';

@Injectable()
export class DataTableResolver implements Resolve<any>{

  constructor(private getBugsService: GetBugsService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Bugs[]> {
    return this.getBugsService.getBugs();
  }
}
