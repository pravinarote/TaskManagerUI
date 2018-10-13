import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import  { DataTableModule } from  'angular-6-datatable'

import { FormsModule,ReactiveFormsModule } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router'
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { TaskManagementService } from './services/task-management.service'

import { AppComponent } from './app.component';
import { AddComponent } from './ui/add/add.component';
import { ViewComponent } from './ui/view/view.component';
import { UpdateComponent } from './ui/update/update.component';
import { TaskNameFilterPipePipe } from './pipe/task-name-filter-pipe.pipe';


const appRoutes:Routes=[
  { path:'Add',component:AddComponent },
  { path:'View', component:ViewComponent},
  { path:'Update/:id', component:UpdateComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    AddComponent,
    ViewComponent,
    UpdateComponent,
    TaskNameFilterPipePipe
    
  ],
  imports: [
    BrowserModule, FormsModule, RouterModule.forRoot(appRoutes),
     HttpClientModule, ReactiveFormsModule,DataTableModule
  ],
  providers: [TaskManagementService],
  bootstrap: [AppComponent]
})
export class AppModule { }
