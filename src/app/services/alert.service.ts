import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  success(title: string, text?: string): void {
    Swal.fire({
      icon: 'success',
      title,
      text,
      confirmButtonText: 'Aceptar',
      background: '#131c2e',
      color: '#f8fafc',
      confirmButtonColor: '#1db954',
    });
  }

  error(title: string, text?: string): void {
    Swal.fire({
      icon: 'error',
      title,
      text,
      confirmButtonText: 'Aceptar',
      background: '#131c2e',
      color: '#f8fafc',
      confirmButtonColor: '#ff5a5f',
    });
  }

  warning(title: string, text?: string): void {
    Swal.fire({
      icon: 'warning',
      title,
      text,
      confirmButtonText: 'Aceptar',
      background: '#131c2e',
      color: '#f8fafc',
      confirmButtonColor: '#f5b301',
    });
  }
}