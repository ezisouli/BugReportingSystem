import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Us1Component } from './us1/us1.component';
import { Us2Component } from './us2/us2.component';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { ContentComponent } from './content/content.component';
import { ReactiveFormsModule } from '@angular/forms';


const routes : Routes = [
  {
    path:'buglist' , component : Us1Component,
  },
  {
    path: 'bugform' , component : Us2Component
  }
]

@NgModule({
  declarations: [Us1Component, Us2Component, NavComponent, FooterComponent, ContentComponent],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule
  ],
  exports:[
    Us1Component,
    Us2Component,
    NavComponent,
    FooterComponent,
    ContentComponent
  ]
})
export class UserStory1Module { }
