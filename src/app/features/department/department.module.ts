import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentRoutingModule } from './department-routing.module';
import { DepartmentListComponent } from './pages/department-list/department-list.component';
import { DepartmentFormComponent } from './pages/department-form/department-form.component';
import { ReactiveFormsModule} from '@angular/forms';
import { DepartmentDetailComponent } from './pages/department-detail/department-detail.component';



@NgModule({
  declarations: [
    DepartmentListComponent,
    DepartmentFormComponent,
    DepartmentDetailComponent, 
  ],
  imports: [
    CommonModule,
    DepartmentRoutingModule,
    ReactiveFormsModule,

  ]
})
export class DepartmentModule { }
