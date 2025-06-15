import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  error = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    
    this.valitaSession();

    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  valitaSession(): void {
  const token = localStorage.getItem('jwt');
  if (token) {
    this.router.navigate(['/home']);
  }
}

  onSubmit(): void {
    if (this.form.invalid) return;

     if (this.form.valid) {
      const { username, password } = this.form.value;
      console.log('Intentando login con:', username, password);
      
      this.authService.login({ username, password }).subscribe({
      next: res => {
        this.authService.saveToken(res.token);
        this.router.navigate(['/home']);
      },
      error: () => this.error = 'Credenciales inválidas.'
    });    } else {
      this.form.markAllAsTouched(); // fuerza mostrar errores
    }

    
  }
}
