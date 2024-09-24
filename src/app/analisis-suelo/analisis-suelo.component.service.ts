import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoginService } from '../login/login.service';


@Injectable({
  providedIn: 'root'
})
export class AnalisisSueloService {
    private apiUrl = 'https://guia-mango.onrender.com'; 
    
  constructor(private http: HttpClient,
    private loginService: LoginService
  ) { }

  // agregarDatos(data: any): Observable<any> {
  //   const token = this.loginService.getToken;
  //   console.log(data)
  //   return this.http.post<any>(`${this.apiUrl}/analisis-suelo/analisis-suelo/`, data, /token ).pipe(
  //           tap(
  //               (resp) => resp
  //           )
  //       );
  // }

  agregarDatos(data: any): Observable<any> {
    const token = this.loginService.getToken();  
    console.log(token)
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`  
    });

    console.log(data);

    return this.http.post<any>(`${this.apiUrl}/analisis-suelo/analisis-suelo/`, data,
      { headers }).pipe(
      tap(
        (resp) => resp
      ) 
    );
  }
 
}