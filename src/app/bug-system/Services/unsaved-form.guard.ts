import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { DataFormComponent } from '../dataForm/dataForm.component';

@Injectable({
  providedIn: 'root'
})
export class UnsavedFormGuard implements CanDeactivate<DataFormComponent> {
  canDeactivate(
    component: DataFormComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): boolean {
      if (!component.canDeactivate()) {      
        return window.confirm("You have unsaved data. Are you sure you want to leave the page?");    }
    return true;
  }
  
}
export interface BaseComponent {
  canDeactivate: () => boolean;
}
