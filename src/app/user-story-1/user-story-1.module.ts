import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Us1Component } from './us1/us1.component';
import { Us2Component } from './us2/us2.component';
import { RouterModule, Routes } from '@angular/router';

const routes : Routes = [
  {
    path:'buglist' , component : Us1Component
  },
  {
    path: 'bugform' , component : Us2Component
  }
]

@NgModule({
  declarations: [Us1Component, Us2Component],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[
    Us1Component,
    Us2Component
  ]
})
export class UserStory1Module { }
