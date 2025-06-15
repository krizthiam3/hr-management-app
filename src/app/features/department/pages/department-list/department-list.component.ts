import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Department } from 'src/app/core/models/department.model';
import { DepartmentService } from 'src/app/core/services/department.service';
import * as $ from 'jquery';
import 'datatables.net';
import { Router } from '@angular/router';


@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html'
})
export class DepartmentListComponent implements OnInit, AfterViewInit {
  departments: Department[] = [];

  constructor(private documentService: DepartmentService, private router: Router) {}

  ngOnInit(): void {
    this.loadData();
    }
  
    loadData()
    {
      this.documentService.getAll().subscribe(res => {
          this.departments = res;
        });
    }

  ngAfterViewInit(): void {
    setTimeout(() => {
      ($('#departmentTable') as any).DataTable();
    }, 100);
  }  

  editEmployee(id: number) {
  this.router.navigate(['/departments/edit', id]);
  }

  deleteEmployee(id: number) {
    if (confirm('¿Estás seguro de eliminar este department?')) {
      this.documentService.delete(id).subscribe({
        next: () => this.departments = this.departments.filter(d => d.id !== id), 
        error: err => alert('Error al eliminar: ' + err.message)
      });
    }
  }

  
  isAdmin(): boolean {
    debugger
  const token = localStorage.getItem('jwt');
  if (!token) return false;

  const payload = JSON.parse(atob(token.split('.')[1]));


  return payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].toLowerCase() === 'admin';

}

   goBackToList() {
    this.router.navigate(['home']); 
  }
}
