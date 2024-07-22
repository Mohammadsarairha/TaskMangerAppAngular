import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProjectComponent } from './project/project.component';
import { TaskComponent } from './task/task.component';
import { authGuard } from './_guard/auth.guard';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path:'' , component:HomeComponent},
  {path:'',
    runGuardsAndResolvers:'always',
    canActivate: [authGuard],
    children:[
      {path:'project' , component:ProjectComponent , canActivate: [authGuard]},
      {path:'projectTasks' , component:TaskComponent , canActivate: [authGuard]},
    ]
  },
  {path:'register' , component:RegisterComponent},
  {path:'**' ,component:HomeComponent,pathMatch:'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
