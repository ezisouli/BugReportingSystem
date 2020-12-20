import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { ContentComponent } from './content/content.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IntroComponent } from './intro/intro.component';
import { DataTableComponent } from './dataTable/dataTable.component';
import { DataFormComponent } from './dataForm/dataForm.component';
import { UnsavedFormGuard } from './Services/unsaved-form.guard';


const routes : Routes = [
  {path:'',component:IntroComponent},
  {path:'buglist' , component : DataTableComponent},
  {path:'bugform/:id' , component : DataFormComponent},
  {path:'create' , component : DataFormComponent}
  
]

@NgModule({
  declarations: [DataTableComponent, DataFormComponent, NavComponent, FooterComponent, ContentComponent, IntroComponent],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    FormsModule
  ],
  exports:[
    IntroComponent,
    DataTableComponent,
    DataFormComponent,
    NavComponent,
    FooterComponent,
    ContentComponent
  ]
})
export class BugSystemModule { }
