import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoginService } from '../login/login.service';


@Injectable({
  providedIn: 'root'
})
export class PlagasComponentService {
    private apiUrl = 'https://guia-mango.onrender.com'; 
    
  constructor(private http: HttpClient,
    private loginService: LoginService
  ) { }


  agregarImagen(data: any): Observable<any> {
    const token = this.loginService.getToken();  
    console.log(token)
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`  
    });

    console.log(data);

    return this.http.post<any>(`${this.apiUrl}/aquicomplemento/`, data,
      { headers }).pipe(
      tap(
        (resp) => resp
      ) 
    );
  }
 
}