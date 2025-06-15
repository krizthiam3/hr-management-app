import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepartmentService } from 'src/app/core/services/department.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-department-form',
  templateUrl: './department-form.component.html'
})
export class DepartmentFormComponent implements OnInit {
  form!: FormGroup;
  isEdit = false;
  id!: number;
  errorMessage: string | null = null;


  constructor(
    private fb: FormBuilder,
    private service: DepartmentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      location: ['', Validators.required]
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.id = +id;
      this.isEdit = true;
      this.service.getById(this.id).subscribe(d =>
        this.form.patchValue(d)
      );
    }
  }

  submit() {
    if (this.form.invalid) return;

    const data = this.form.value;

    if (this.isEdit) {
      this.service.update(this.id, { id: this.id, ...data }).subscribe({
        next: () => this.router.navigate(['/departments']),
        error: (error) => this.handleError(error)      
      });
    } else {
      this.service.create(data).subscribe({
        next: () => this.router.navigate(['/departments']),
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

 goBackToList() {
    this.router.navigate(['departments']); // 
  }

}
