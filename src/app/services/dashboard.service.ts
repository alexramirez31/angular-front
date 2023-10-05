import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const URL = environment.urlServer;

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http:HttpClient) { }

  obtenerDashboard(){
    let headers= new HttpHeaders({
      'token':localStorage.getItem('token')
  
    });
    return this.http.post(`${URL}/dashboard/obtener`,{headers});
  
  }
}
