import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';



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
        return window.confirm("Are you sure you want to leave the page?");    }
    return true;
  }
  
}

