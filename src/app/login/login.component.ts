import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {  ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { LoginService } from './login.service';
import { Usuario } from './login.types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent{
  
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private LoginService: LoginService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      usuario: ['', Validators.required],
      contrasena: ['', Validators.required]
    });
  }

  logueo(): void {
    if (this.loginForm.valid) {
      const { usuario, contrasena } = this.loginForm.value;
      this.LoginService.login(usuario, contrasena).subscribe(
        response => {
          //console.log('Login successful', response);
          this.router.navigate(['/admin/home']);
        },
        error => {
          console.error('Login failed', error);
          console.log('Login fallo');
        }
      );
    }
  }

}
