import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { DataFormComponent } from '../dataForm/dataForm.component';

export interface BaseComponent {
  canDeactivate: () => boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UnsavedFormGuard implements CanDeactivate<BaseComponent> {
  canDeactivate(
    component: BaseComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): boolean {
      if (!component.canDeactivate()) {      
        return window.confirm("You have unsaved data. Are you sure you want to leave the page?");    }
    return true;
  }
  
}

