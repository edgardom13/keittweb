import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AnalisisSueloService } from './analisis-suelo.component.service';

@Component({
  selector: 'app-analisis-suelo',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './analisis-suelo.component.html',
  styleUrl: './analisis-suelo.component.css'
})
export class AnalisisSueloComponent {
  dataForm!: FormGroup;

  constructor(private fb: FormBuilder, 
    private http: HttpClient,
  private analisisSueloservice : AnalisisSueloService) {}

  ngOnInit() {
    this.dataForm = this.fb.group({
      sand: ['', Validators.required],
      silt: ['', Validators.required],
      clay: ['', Validators.required],
      ph: ['', Validators.required],
      nh4: ['', Validators.required],
      nh3: ['', Validators.required],
      phosphorus: ['', Validators.required],
      potassium: ['', Validators.required],
      calcium: ['', Validators.required],
      magnesium: ['', Validators.required],
      sodium: ['', Validators.required],
      aluminum: ['', Validators.required],
      sulfur: ['', Validators.required],
      iron: ['', Validators.required],
      manganese: ['', Validators.required],
      zinc: ['', Validators.required],
      copper: ['', Validators.required],
      boron: ['', Validators.required],      
      densidad_aparente: ['', Validators.required],
      profundidad_cm : ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.dataForm.valid) {
        this.analisisSueloservice.agregarDatos(this.dataForm.value).subscribe(
        response => {
          console.log('Datos enviados:', response);
        },
        error => {
          console.error('Error al enviar los datos:', error);
        }
      );
    } else {
      console.log('El formulario no es válido.');
    }
  }
}
