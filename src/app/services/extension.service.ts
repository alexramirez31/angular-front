import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AgregarForm } from '../interfaces/agregar-extension-interface';
import { EditextensionForm } from '../interfaces/edit-extension-form.interface';
import { Extension } from '../models/extension.model';

//http://localhost:3000
const URL = environment.urlServer;

@Injectable({
  providedIn: 'root'
})
export class ExtensionService {



  constructor(private http:HttpClient) { }

  obtenerExtensiones(){
    let headers= new HttpHeaders({
      'token':localStorage.getItem('token')
  
    });
    return this.http.post(`${URL}/extensiones/obtener`,{headers});
  
  }

  newExtension(formData:AgregarForm){
    return this.http.post(`${URL}/extensiones/agregar`,formData,{responseType: 'text'});
  
  }

  deleteExtension(id:string){

    let headers = new HttpHeaders({
      //'token': this.token
      'token':localStorage.getItem('token')
    });
    return this.http.delete(`${URL}/extensiones/delete/${id}`,{headers});
  
  }

  obtenerExtensionesId(id:string){
    let headers= new HttpHeaders({
      'token':localStorage.getItem('token')
  
    });
    return this.http.post(`${URL}/extensiones/obtener/${id}`,{headers});
  
  }
  
  editarExtension(id:string,editData:EditextensionForm){
    let headers = new HttpHeaders({
      'token':localStorage.getItem('token')
    });
  
   return this.http.post(`${URL}/extensiones/editar/${id}`, editData, {headers});
    
  }



}
