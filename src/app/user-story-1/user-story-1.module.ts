import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Us1Component } from './us1/us1.component';



@NgModule({
  declarations: [Us1Component],
  imports: [
    CommonModule
  ],
  exports:[
    Us1Component
  ]
})
export class UserStory1Module { }
