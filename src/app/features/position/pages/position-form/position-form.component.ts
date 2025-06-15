import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PositionService } from 'src/app/core/services/position.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-position-form',
  templateUrl: './position-form.component.html'
})
export class PositionFormComponent implements OnInit {
  form!: FormGroup;
  isEdit = false;
  id!: number;
  errorMessage: string | null = null;


  constructor(
    private fb: FormBuilder,
    private service: PositionService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['']
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.id = +id;
      this.isEdit = true;
      this.service.getById(this.id).subscribe(p =>
        this.form.patchValue(p)
      );
    }
  }

  submit() {
    if (this.form.invalid) return;

    const data = this.form.value;

    if (this.isEdit) {
      this.service.update(this.id, { id: this.id, ...data }).subscribe({
      next: () => this.router.navigate(['/positions']),
      error: (error) => this.handleError(error)     
     });
    } else {
      this.service.create(data).subscribe( {
        next: () => this.router.navigate(['/positions']),
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
    this.router.navigate(['positions']); 
  }

}
