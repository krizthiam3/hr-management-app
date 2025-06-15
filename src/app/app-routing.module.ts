import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '',     pathMatch: 'full', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'employees',  loadChildren:  () => import('./features/employee/employee.module').then(m => m.EmployeeModule) , canActivate: [AuthGuard]},
  { path: 'departments', loadChildren: () => import('./features/department/department.module').then(m => m.DepartmentModule), canActivate: [AuthGuard]},
  { path: 'positions', loadChildren:   () => import('./features/position/position.module').then(m => m.PositionModule), canActivate: [AuthGuard]},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
