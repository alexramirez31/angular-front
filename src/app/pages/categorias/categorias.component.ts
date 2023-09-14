import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators  } from '@angular/forms';
import { Subject } from 'rxjs';
import { Categoria } from 'src/app/models/categoria.model';
import { CategoriaService } from 'src/app/services/categoria.service';
import Swal from 'sweetalert2';
import { log } from 'util';

declare var $:any;

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  categorias:Categoria[]=[];
  dtOptions: DataTables.Settings = {};
  formSubmited =false;

 
  dtTrigger: Subject<any> = new Subject<any>();

  id_categoria:number=0;

  public categoriaForm= this.fb.group({

    nombre:['',[Validators.required]],
    descripcion:['',[Validators.required]],
  
  }
  );


  constructor(private fb:FormBuilder,private categoriaSvc:CategoriaService) { }

  ngOnInit(): void {
    this.obtenerCategoria();
    this.dtOptions = {
      
      pageLength: 10,
      searching:true,
      responsive:true,
      info:false,
      language:{url:'//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json'}
    };
  }
 
  crearCategoria(){
    this,this.formSubmited=true;
    if(this.categoriaForm.invalid){
      return;
    }
    //Realizar posteo
  
    
    this.categoriaSvc.newCategoria(this.categoriaForm.value).subscribe(res=>{
      Swal.fire({
        icon:'success',
        title:'Éxito',
        text:'Categoria creada correctamente',
        showConfirmButton:true

      }).then((result)=>{
        location.reload();
    
    });
  },(err)=>{
    const errorServer = JSON.parse(err.error);
    Swal.fire('Error',errorServer.message,'error');
  })

  }

  obtenerCategoria(){
    this.categoriaSvc.obtenerCategorias().subscribe((res:any) =>{
      this.categorias=res;
      this.dtTrigger.next();
    });
  }

  editarCategoria(){
     let nombre_guardar =this.categoriaForm.get("nombre").value;
    let descripcion_guardar = this.categoriaForm.get("descripcion").value
   
   if (nombre_guardar !='' && descripcion_guardar !='' ) {
    this.categoriaSvc.editarCategoria(this.id_categoria.toString(), this.categoriaForm.value).subscribe(res=>{

      Swal.fire({
        icon:'success',
        title:'Exito',
        text:'La Categoria se actualizo correctamente',
        confirmButtonText:'Ok'
      }).then((result)=>{

        if (result) {
            
          this.id_categoria=0
          location.reload();

        }

      });
    },(err)=>{
      Swal.fire('Error', err.error.message, 'error');
    });
   }else{
    Swal.fire('Error', "Verificar Campos Requeridos", 'error');
   }
   
  }

  eliminarCategoria(id:string){
    Swal.fire({
      icon:'question',
      title:'Desea eliminar esta  Categoria ?',
      showCancelButton:true,
      confirmButtonText:'Confirmar'
    }).then((result)=>{
      if(result.isConfirmed){
        this.categoriaSvc.deleteCategoria(id).subscribe((res:any)=>{
          Swal.fire({
            icon:'success',
            title:'Categoria eliminada correctamente',
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

  llenarForm(id:string){

    this.categoriaSvc.obtenerCategoriasId(id).subscribe(res=>{
      
      
      this.id_categoria= res[0]['id']
      this.categoriaForm.setValue({
        nombre:res[0]['nombre'],
        descripcion:res[0]['descripcion'],

      });

      $('#editarCategoria').modal('toggle');
      $('#editarCategoria').modal('show');

   
    });
  }
    campoNoValido(campo:string): boolean{
      if(this.categoriaForm.get(campo).invalid && this.formSubmited){
        return true;
      }else{
        return false;
      }
  
    }

  
}



