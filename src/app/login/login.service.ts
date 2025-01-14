import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Usuario } from './login.types';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
    private apiUrl = 'https://kiettweb.onrender.com'; // Cambia esto por la URL de tu API

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const token = this.getToken();  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(`${this.apiUrl}/login/`, { username, password }, { headers }).pipe(
      tap(response => { 
        if (response.token) {
          localStorage.setItem('token', response.token);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}