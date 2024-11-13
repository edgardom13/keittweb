import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { PlagasComponentService } from './plagas.component.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-plagas',
  standalone: true,
  imports: [],
  templateUrl: './plagas.component.html',
  styleUrl: './plagas.component.css',
})
export class PlagasComponent {
  archivoValido: boolean = false;
  archivoSeleccionado: File | null = null;
  imagenDataUrl: string | ArrayBuffer | null = null;

  constructor(
    private http: HttpClient,
    private plagasService: PlagasComponentService
  ) {}

  onFileSelected(event: Event): void {
  const input = event.target as HTMLInputElement;
  event.preventDefault();
  
  if (input.files && input.files.length > 0) {
    const file = input.files[0];
    
    if (file.type.startsWith('image/')) {
      this.archivoSeleccionado = file;
      this.archivoValido = true;
      
      // Usar FileReader para leer el archivo y generar una URL de datos
      const reader = new FileReader();
      reader.onload = () => {
        this.imagenDataUrl = reader.result;
        
      };
      reader.readAsDataURL(file);
      
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
      console.log(this.archivoSeleccionado);
      formData.append('image', this.archivoSeleccionado);

      this.plagasService.agregarImagen(formData).subscribe(
        (response) => {
          console.log('Respuesta de la API:', response);
          const prediccion = response.prediccion; 
          const recomendacionesFormateadas = response.recomendaciones;

          
          const prediccionFormateada = prediccion

            .toUpperCase() 
            .replace(/_/g, ' '); 

          
          Swal.fire({
            title: 'Predicción de la Imagen',
            html: `<p><strong>La predicción es:</strong> ${prediccionFormateada}</p>
                   <p><strong>Recomendaciones:</strong> ${recomendacionesFormateadas}</p>`,
            imageUrl: this.imagenDataUrl as string,
            imageAlt: 'Imagen seleccionada',
            confirmButtonText: 'OK',
          });
        },
        (error) => {
          console.error('Error al enviar la imagen:', error);
          Swal.fire({
            title: 'Error',
            text: 'Hubo un error al analizar la imagen. Inténtalo de nuevo.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      );
    }
  }
}
