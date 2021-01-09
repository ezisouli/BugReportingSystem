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
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './Services/auth.interceptor';


const routes : Routes = [
  {path:'',component:IntroComponent},
  {path:'buglist' , component : DataTableComponent},
  {path:'bugform/:id' , component : DataFormComponent,
  canDeactivate: [UnsavedFormGuard]},
  {path:'create' , component : DataFormComponent,
  canDeactivate: [UnsavedFormGuard]}
  
]

@NgModule({
  declarations: [DataTableComponent, DataFormComponent, NavComponent, FooterComponent, ContentComponent, IntroComponent],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule
  ],
  exports:[
    IntroComponent,
    DataTableComponent,
    DataFormComponent,
    NavComponent,
    FooterComponent,
    ContentComponent
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ]

})
export class BugSystemModule { }
