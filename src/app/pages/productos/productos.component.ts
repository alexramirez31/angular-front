import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Producto } from 'src/app/models/producto.model';
import { ProductoService } from 'src/app/services/producto.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';


declare var $:any;

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styles: [
  ]
})
export class ProductosComponent implements OnInit {
  @ViewChild('file_editar') file_editar:ElementRef<HTMLInputElement>
  @ViewChild('img_editar') img_editar:ElementRef<HTMLImageElement>

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  productos:Producto[]=[];

  formSubmited =false;

  title='uploadFiles';
  image: File = null;
  imgURL='assets/noimage.png';
  imgURL_editar='';
  images:any=[];

  id_producto:number=0;
  categorias:any=[];

  public productoForm= this.fb.group({
    id_categoria:['',[Validators.required]],
    nombre:['',[Validators.required]],
    imagen:['',[Validators.required]],
    //imagen:[{value:'', disabled: true},[Validators.required]],
    stock:['',[Validators.required]],
    precio_compra:['',[Validators.required]],
    precio_venta:['',[Validators.required]],
    
  },{
    //Validators:this.passwordsIguales('password','password2')
  });


  
  constructor(private fb:FormBuilder,private router:Router,private productoSvc: ProductoService,private http:HttpClient ) { }

  ngOnInit(): void {
    this.obtenerProductos();
    this.dtOptions = {
      
      pageLength: 10,
      searching:true,
      responsive:true,
      info:false,
      language:{url:'//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json'}
    };
  }

  //Crear producto
  crearProducto(){
    const formData = new FormData();
    formData.append('file',this.image);
    console.log(formData)
    if (this.image==null){
      this.productoForm.get("imagen").setValue('0');
      this.insertTabla('');
    }else{
      this.http.post<any>('http://localhost:3000/productos/file',formData).subscribe({
        next: (res)=> {
          
          this.insertTabla(res);
        },
        error: () => {
          Swal.fire('Error','Error al intentar guardar imagen','error');
        }
    });
    }

  }


  //Insertar tabla
  insertTabla(file:any){
     this.formSubmited=true;
    if(this.productoForm.invalid){
      return;
    }
    //Realizar posteo
    if (file==''){
      this.productoForm.get("imagen").setValue('0');
    }else{
      this.productoForm.get("imagen").setValue(file.filename);
    }


    // this.productoForm.get("imagen").setValue(file.filename);
      this.productoSvc.newProducto(this.productoForm.value).subscribe(res=>{
      Swal.fire({
        icon:'success',
        title:'Éxito',
        text:'Producto creado correctamente',
        showConfirmButton:true

      }).then((result)=>{
        location.reload();
    
    });
  },(err)=>{
    const errorServer = JSON.parse(err.error);
    Swal.fire('Error',errorServer.message,'error');
  })
  }

//Editar tabla
insertTablaEditar(file:any){
  this.formSubmited=true;
  if(this.productoForm.invalid){
    return;
  }
  //Realizar posteo
  if (file==null || (this.productoForm.get("imagen").value=='noimage.png')){
    this.productoForm.get("imagen").setValue('0');
  }else{
    this.productoForm.get("imagen").setValue(file.filename);
  }
    this.productoSvc.editProducto(this.id_producto.toString(),this.productoForm.value).subscribe(res=>{
    Swal.fire({
      icon:'success',
      title:'Éxito',
      text:'Producto creado correctamente',
      showConfirmButton:true

    }).then((result)=>{
      location.reload();
  
  });
},(err)=>{
  const errorServer = JSON.parse(err.error);
  Swal.fire('Error',errorServer.message,'error');
})
}

//limpiar Imagen
limpiar_imagen(){
  this.file_editar.nativeElement.files=null;
  this.img_editar.nativeElement.src=this.imgURL;
  this.image=null;
  this.productoForm.get('imagen').setValue('noimage.png')
}

//Cargando imagen en Input editar
 async loadimage(event:any){
  if (!event.target.src.includes('base64')){
    let filename=event.target.src.split('/');
    filename=filename[filename.length-1];
    const response = await fetch(event.target.src, { mode: 'cors' })
    const blob = await response.blob();
     const file = new File([blob], filename , { type: blob.type || 'image/jpg' });
    const data = new DataTransfer()
    
    data.items.add(file)
    this.file_editar.nativeElement.files = data.files
    this.image=file;
  }

}

//Seleccionar Imagen
  selectImage(event){
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload=(event:any)=>{
      this.imgURL=event.target.result;
    }
    this.image=file;
    this.productoForm.get('imagen').setValue(file.name);
   
  }

//Seleccionar Imagen en editar
  selectImageEditar(event){
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload=(event:any)=>{
      this.imgURL_editar=event.target.result;
    }
    this.image=file;
    this.productoForm.get('imagen').setValue(file.name);
   
  }

//Obtener Productos
  obtenerProductos(){
    this.productoSvc.obtenerProductos().subscribe((res:any) =>{
      this.productos=res[0];
      
      this.categorias=res[1];
      // const reader = new FileReader();
      // reader.onload= this.productos

      this.dtTrigger.next();
    });
  }

  //Validar campos
  campoNoValido(campo:string): boolean{
    if(this.productoForm.get(campo).invalid && this.formSubmited){
      return true;
    }else{
      return false;
    }

  }

  //Eliminar Producto
  eliminarProducto(id:string){
    Swal.fire({
      icon:'question',
      title:'Desea eliminar este Producto ?',
      showCancelButton:true,
      confirmButtonText:'Confirmar'
    }).then((result)=>{
      if(result.isConfirmed){
        this.productoSvc.deleteProducto(id).subscribe((res:any)=>{
          Swal.fire({
            icon:'success',
            title:'Producto eliminada correctamente',
            confirmButtonText:'Ok'
          }).then((result)=>{
            if (result){
              location.reload();
            }
          });
      },(err)=>{
        Swal.fire('Error',err.error.message,'error')
      })
      }

    });
  }

  //Editar Producto
  editarProducto(){
    const formData = new FormData();
    formData.append('file',this.image);
    this.http.post<any>('http://localhost:3000/productos/file',formData).subscribe({
      next: (res)=> {
        console.log(res);
        this.insertTablaEditar(res);
      },
      error: () => {
        Swal.fire('Error','Error al intentar guardar imagen','error');
      }
  });

  }

  //LLenar Formulario
  llenarForm(id:string){

    this.productoSvc.obtenerProductosID(id).subscribe(res=>{
      this.id_producto= res[0]['id'];
      this.imgURL_editar= 'http://localhost:3000/'+res[0]['imagen'];
      
      this.productoForm.patchValue({
        id_categoria:res[0]['id_categoria'],
        nombre:res[0]['nombre'],
        imagen:res[0]['imagen'],
        stock:res[0]['stock'],
        precio_compra:res[0]['precio_compra'],
        precio_venta:res[0]['precio_venta'],
        
      });

      $('#editarProducto').modal('toggle');
      $('#editarProducto').modal('show');

   
    });
  }
}
