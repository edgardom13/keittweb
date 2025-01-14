import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, of, tap } from 'rxjs';
import { AlertService } from '../alert.service';


@Injectable({
  providedIn: 'root'
})
export class AdminService {
    private logoutUrl = 'https://guia-mango.onrender.com/logout/'; // Cambia esto por la URL de tu API
    alertService: any;

  constructor(private http: HttpClient, private router: Router) { }

  isAuthenticated(){
    const token = localStorage.getItem('token');
    return token;
  }

  logout(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(this.logoutUrl, {}, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).pipe(
      tap(() => {
        localStorage.removeItem('token');
        this.router.navigate(['/']);
      }),
      catchError(error => {
        console.error('Logout error:', error);
        return of(null); // Manejar el error según sea necesario
      })
    );
  } 

  performLogout(): void {
    this.logout().subscribe();
  }

  verificarToken(){

  }

}