import { Component, OnInit, AfterViewInit } from '@angular/core';
import { EmployeeService } from 'src/app/core/services/employee.service';
import * as $ from 'jquery';
import 'datatables.net';
import { Router } from '@angular/router';
import { Employee } from 'src/app/core/models/employee.model';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html'
})
export class EmployeeListComponent implements OnInit, AfterViewInit {
  employees: Employee[] = [];

  constructor(private service: EmployeeService,  private router: Router) {}

  ngOnInit(): void {
  this.loadData();
  }

  loadData()
  {
  this.service.getAll().subscribe(res => {
      this.employees = res;
    });

  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      ($('#employeeTable') as any).DataTable();
    }, 100);
  }

  editEmployee(id: number) {
  this.router.navigate(['/employees/edit', id]);
}

  deleteEmployee(id: number) {
    if (confirm('¿Estás seguro de eliminar este empleado?')) {
      this.service.delete(id).subscribe({
        next: () =>  this.employees = this.employees.filter(emp => emp.id !== id), 
        error: err => alert('Error al eliminar: ' + err.message)
      });
    }
  }

  isAdmin(): boolean {
  const token = localStorage.getItem('jwt');
  if (!token) return false;

  const payload = JSON.parse(atob(token.split('.')[1]));
  return payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] === 'Admin';
}

  goBackToList() {
    this.router.navigate(['home']); 
  }
}
