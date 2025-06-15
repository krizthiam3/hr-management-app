import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PositionRoutingModule } from './position-routing.module';
import { PositionListComponent } from './pages/position-list/position-list.component';
import { PositionFormComponent } from './pages/position-form/position-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PositionDetailComponent } from './pages/position-detail/position-detail.component';


@NgModule({
  declarations: [
    PositionListComponent,
    PositionFormComponent,
    PositionDetailComponent
  ],
  imports: [
    CommonModule,
    PositionRoutingModule, ReactiveFormsModule
  ]
})
export class PositionModule { }
