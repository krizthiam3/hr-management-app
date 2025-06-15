import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentListComponent } from './pages/department-list/department-list.component';
import { DepartmentFormComponent } from './pages/department-form/department-form.component';
import { DepartmentDetailComponent } from './pages/department-detail/department-detail.component';

const routes: Routes = [
  { path: '', component: DepartmentListComponent },
  { path: 'new', component: DepartmentFormComponent },
  { path: 'edit/:id', component: DepartmentFormComponent },
  { path: ':id/detail', component: DepartmentDetailComponent }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentRoutingModule { }
