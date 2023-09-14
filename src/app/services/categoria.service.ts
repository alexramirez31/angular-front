import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AgregarCategoriaForm } from '../interfaces/agregar-categoria.interface';
import { editCategoriaForm } from '../interfaces/edit-categoria-form.interface';

const URL = environment.urlServer;

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
 

  constructor(private http:HttpClient) { }

  obtenerCategorias(){
    let headers= new HttpHeaders({
      'token':localStorage.getItem('token')
  
    });
    return this.http.post(`${URL}/categorias/obtener`,{headers});
  
  }

  newCategoria(formData:AgregarCategoriaForm){
    return this.http.post(`${URL}/categorias/agregar`,formData,{responseType: 'text'});
  
  }

  obtenerCategoriasId(id:string){
    let headers= new HttpHeaders({
      'token':localStorage.getItem('token')
    });
    return this.http.post(`${URL}/categorias/obtener/${id}`,{headers});
  
  }

  editarCategoria(id:string,editData:editCategoriaForm){
    let headers = new HttpHeaders({
      'token':localStorage.getItem('token')
    });
  
   return this.http.post(`${URL}/categorias/editar/${id}`, editData, {headers});
    
  }

  deleteCategoria(id:string){

    let headers = new HttpHeaders({
      //'token': this.token
      'token':localStorage.getItem('token')
    });
    return this.http.delete(`${URL}/categorias/delete/${id}`,{headers});
  
  }

}
