import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder, ValidationErrors, ValidatorFn, AbstractControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { RegistroService } from './registro.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent {
  registroForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private RegistroService: RegistroService,
    private router: Router
  ) {
    this.registroForm = this.fb.group(
      {
        username: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        repassword: ['', [Validators.required, Validators.minLength(6)]],
        email: ['', [Validators.required, Validators.email]],
      },
      { validators: this.passwordsMatchValidator } // Añadimos el validador personalizado
    );
  }

  // Validador personalizado para comprobar si las contraseñas coinciden
  private passwordsMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const repassword = control.get('repassword')?.value;
    return password === repassword ? null : { passwordsMismatch: true };
    
  };

  
registro(): void {
  if (this.registroForm.valid) {
    const { password, username, email, repassword } = this.registroForm.value;

    this.RegistroService.registro(password, username, email, repassword).subscribe({
      next: (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
          text: '¡El registro se completó correctamente!',
          confirmButtonText: 'Aceptar',
        }).then(() => {
          this.registroForm.reset()
          this.router.navigate(['/login']); 
        });
      },
      error: (err) => {

        if (err.status === 400) {
          Swal.fire({
            icon: 'error',
            title: 'Usuario existente',
            text: 'El nombre de usuario o correo electrónico ya está registrado.',
            confirmButtonText: 'Aceptar',
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error en el registro',
            text: 'Ocurrió un problema al registrar. Por favor, inténtalo nuevamente.',
            confirmButtonText: 'Aceptar',
          });
        }
      },
    });
  } else {
    Swal.fire({
      icon: 'warning',
      title: 'Formulario inválido',
      text: 'Por favor, verifica los campos y asegúrate de completarlos correctamente.',
      confirmButtonText: 'Aceptar',
    });
  }
}
}
