import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RegistroService {
    private apiUrl = 'https://guia-mango.onrender.com'; // Cambia esto por la URL de tu API

  constructor(private http: HttpClient) { }

  registro(password: string ,username: string, email: string, repassword: string): Observable<any> {
 
    return this.http.post<any>(`${this.apiUrl}/usuario/usuario/`, { username, password, email,repassword  },).pipe(
      tap(
        (resp) => resp
      ) 
    );
  }
}