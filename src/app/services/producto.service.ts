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

  newProducto(formData:AgregarProductoForm){
    return this.http.post(`${URL}/file`,formData,{responseType: 'text'});
  
  }


}
