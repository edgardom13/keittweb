import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { PlagasComponentService } from './plagas.component.service';

@Component({
  selector: 'app-plagas',
  standalone: true,
  imports: [],
  templateUrl: './plagas.component.html',
  styleUrl: './plagas.component.css'
})
export class PlagasComponent {
  archivoValido: boolean = false;
  archivoSeleccionado: File | null = null;

  constructor(private http: HttpClient,
    private plagasService : PlagasComponentService
  ) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      
      if (file.type.startsWith('image/')) {
        this.archivoSeleccionado = file;
        this.archivoValido = true;
      } else {
        this.archivoSeleccionado = null;
        this.archivoValido = false;
        alert('Por favor, selecciona un archivo de imagen válido.');
      }
    }
  }

  analizarImagen(): void {
    if (this.archivoSeleccionado) {
      const formData = new FormData();
      formData.append('file', this.archivoSeleccionado);

      this.plagasService.agregarImagen(formData).subscribe(
        response => {
          console.log('Respuesta de la API:', response);
          alert('La imagen ha sido analizada con éxito.');
        },
        error => {
          console.error('Error al enviar la imagen:', error);
          alert('Hubo un error al analizar la imagen. Inténtalo de nuevo.');
        }
      );
    }
  }
}
