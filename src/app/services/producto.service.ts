import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Producto } from '../models/producto.model';
import { AgregarProductoForm } from '../interfaces/agregar-producto.interface';

//http://localhost:3000
const URL = environment.urlServer;
@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http:HttpClient) { }


  obtenerProductos(){
    let headers= new HttpHeaders({
      'token':localStorage.getItem('token')
  
    });
    return this.http.post(`${URL}/productos/obtener`,{headers});
  
  }

  obtenerProductosID(id:string){
    let headers= new HttpHeaders({
      'token':localStorage.getItem('token')
    });
    return this.http.post(`${URL}/productos/obtener/${id}`,{headers});
  
  }

  newProducto(formData:AgregarProductoForm){
    return this.http.post(`${URL}/productos/agregar`,formData,{responseType: 'text'});
  
  }

  editProducto(id:string,formData:AgregarProductoForm){
    return this.http.post(`${URL}/productos/editar/${id}`,formData,{responseType: 'text'});
  
  }

  deleteProducto(id:string){

    let headers = new HttpHeaders({
      //'token': this.token
      'token':localStorage.getItem('token')
    });
    return this.http.delete(`${URL}/productos/delete/${id}`,{headers});
  
  }

}
