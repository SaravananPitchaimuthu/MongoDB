import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsDetailsComponent } from './components/students-details/students-details.component';
import { StudentsListComponent } from './components/students-list/students-list.component';
import { AddStudentComponent } from './components/add-student/add-student.component';

const routes: Routes = [
  { path: '', redirectTo: 'students', pathMatch: 'full' },
  { path: 'students', component: StudentsListComponent },
  { path: 'students/:id', component: StudentsDetailsComponent },
  { path: 'add', component: AddStudentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
