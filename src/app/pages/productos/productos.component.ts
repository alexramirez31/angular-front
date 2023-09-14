import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Producto } from 'src/app/models/producto.model';
import { ProductoService } from 'src/app/services/producto.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styles: [
  ]
})
export class ProductosComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  productos:Producto[]=[];

  formSubmited =false;

  title='uploadFiles';
  image='';
  imgURL='assets/noimage.png';
 

  public productoForm= this.fb.group({

    nombre:['',[Validators.required]],
    categoria:['',[Validators.required]],
    stock:['',[Validators.required]],
    image:['',[Validators.required]],
  
  },{
    //Validators:this.passwordsIguales('password','password2')
  });


  
  constructor(private fb:FormBuilder,private router:Router,private productoSvc: ProductoService,private http:HttpClient ) { }

  ngOnInit(): void {
  }

  crearProducto(){
    const formData = new FormData();
    formData.append('file',this.image);
    this.http.post<any>('http://localhost:3000/productos/file', formData).subscribe(
      (res) => console.log(res,  Swal.fire({
                icon: 'success',
                title: 'Imagen cargada!!',
                text: 'La imagen se subio correctamente!'
                }).then((result) => {
                            if (result) {
                                       location.reload();
                          }
               }) 
         ),
      (err) => Swal.fire({
                      icon: 'error',
                      title: 'Oops...',
                      text: 'Parece que no subio nada!!' 
                    })
    );
   this.imgURL = '/assets/noimage.png';
  
  }

 




  selectImage(event){
    const file = event.target.files[0]
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload=(event:any)=>{
      this.imgURL=event.target.result;
    }
    this.image=file;
  }

  campoNoValido(campo:string): boolean{
    if(this.productoForm.get(campo).invalid && this.formSubmited){
      return true;
    }else{
      return false;
    }

  }

}
