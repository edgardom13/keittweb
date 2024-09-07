// src/app/alert.service.ts
import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() {}

  showAlert(icon: SweetAlertIcon, title: string, text: string) {
    Swal.fire({
      icon: icon,
      title: title,
      text: text
    });
  }

  showSuccess(title: string, text: string) {
    this.showAlert('success', title, text);
  }

  showError(title: string, text: string) {
    this.showAlert('error', title, text);
  }

  showWarning(title: string, text: string) {
    this.showAlert('warning', title, text);
  }

  showInfo(title: string, text: string) {
    this.showAlert('info', title, text);
  }

  showQuestion(title: string, text: string) {
    this.showAlert('question', title, text);
  }
}
