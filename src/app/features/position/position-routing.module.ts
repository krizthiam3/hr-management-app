import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PositionListComponent } from './pages/position-list/position-list.component';
import { PositionFormComponent } from './pages/position-form/position-form.component';
import { PositionDetailComponent } from './pages/position-detail/position-detail.component';

const routes: Routes = [
  { path: '', component: PositionListComponent },
  { path: 'new', component: PositionFormComponent },
  { path: 'edit/:id', component: PositionFormComponent },
  { path: ':id/detail', component: PositionDetailComponent }
  
  
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PositionRoutingModule { }
