import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/core/services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from 'src/app/core/models/department.model';
import { Position } from 'src/app/core/models/position.model';
import { DepartmentService } from 'src/app/core/services/department.service';
import { PositionService } from 'src/app/core/services/position.service';
import { salaryRangeValidator } from 'src/app/validators/salary-range.validator';
import { birthBeforeHireValidator } from 'src/app/validators/date-logic.validator';
import { birthDateNotInFutureValidator } from 'src/app/validators/birth-date.validator';


@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html'
})
export class EmployeeFormComponent implements OnInit {
  form!: FormGroup;
  isEditMode = false;
  employeeId!: number;

  departments: Department[] = [];
  positions: Position[] = [];

  errorMessage: string | null = null;

  selectedFile: File | null = null;
previewUrl: string | null = null;

  constructor(
    private fb: FormBuilder,
    private service: EmployeeService,
    private route: ActivatedRoute,
    private router: Router,
    private departmentService: DepartmentService,
    private positionService: PositionService
  ) {}

  ngOnInit(): void {

    this.departmentService.getAll().subscribe(data => this.departments = data);
    this.positionService.getAll().subscribe(data => this.positions = data);

    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      birthDate: ['', [Validators.required, birthDateNotInFutureValidator()]],
      hireDate: ['', Validators.required],
      salary: [null, [
        Validators.required,
        salaryRangeValidator(1000, 10000)
      ]],
      departmentId: [null, Validators.required],
      positionId: [null, Validators.required]
    }, { validators: birthBeforeHireValidator() });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.employeeId = +id;
      this.service.getById(this.employeeId).subscribe(emp => {

        const department = this.departments.find(d => d.name === emp.departmentName);
        const position = this.positions.find(p => p.title === emp.positionTitle);

        this.form.patchValue({
          firstName: emp.fullName.split(' ')[0],
          lastName: emp.fullName.split(' ')[1],
          email: emp.email,
          phone: emp.phone,
          hireDate: this.formatDate(emp.hireDate),
          birthDate: this.formatDate(emp.birthDate), 
          salary: emp.salary,
          departmentId: department?.id, 
          positionId: position?.id
        });
      });
    }
  }

  submit() {
    if (this.form.invalid) return;

    const data = this.form.value;

    if (typeof data.hireDate === 'string' && isNaN(Date.parse(data.hireDate))) {
      this.errorMessage = 'Formato de fecha inválido.';
      return;
    }

    if (this.isEditMode) {
      data.id = this.employeeId;
     this.service.update(this.employeeId, data).subscribe({
        next: () => this.router.navigate(['/employees']),
        error: (error) => this.handleError(error)
      });
    } else {
      this.service.create(data).subscribe({
        next: () => this.router.navigate(['/employees']),
        error: (error) => this.handleError(error)
      });  
    }
  }

  handleError(error: any) {
  if (error.status === 400 || error.status === 409) {
    this.errorMessage = error.error?.message || 'Error de validación.';
  } else {
    this.errorMessage = 'Error inesperado del servidor.';
  }
}

 formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0]; // Devuelve 'YYYY-MM-DD'
}


onFileSelected(event: any): void {
  const file = event.target.files[0];
  if (file) {
    this.selectedFile = file;

    const reader = new FileReader();
    reader.onload = () => this.previewUrl = reader.result as string;
    reader.readAsDataURL(file);
  }
}



 goBackToList() {
    this.router.navigate(['employees']); 
  }
}
