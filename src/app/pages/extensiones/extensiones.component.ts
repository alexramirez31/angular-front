import { Component, OnInit,OnDestroy } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ExtensionService } from '../../services/extension.service';
import Swal from 'sweetalert2';
import { Extension } from 'src/app/models/extension.model';
import * as XLSX from 'xlsx'
import { ImprimirService } from 'src/app/services/imprimir.service';

declare var $:any;

@Component({
  selector: 'app-extensiones',
  templateUrl: './extensiones.component.html',
  styles: [
  ]
})
export class ExtensionesComponent implements OnInit {
  dtOptions: DataTables.Settings={};
  extensiones:Extension[]=[];

  dtTrigger: Subject<any>= new Subject<any>()
  
  formSubmited =false;
 
  id_extension:number=0;

  //excell
  title='agular-app';
  fileName='ExcelSheet.xlsx';


  public registerForm = this.fb.group({
    nombre:['',[Validators.required]],
    unidad:['',[Validators.required]],
    cargo:['',[Validators.required]],
    extension:['',[Validators.required]],
  
  })

  constructor( 
    private extensionSvc: ExtensionService,
    private fb:FormBuilder,
    private router:Router,
    private srvImprimir: ImprimirService
    ) { }

  ngOnInit(): void {
    this.obtenerExtension();
    this.dtOptions = {
      
      pageLength: 10,
      searching:true,
      responsive:true,
      info:false,
      language:{url:'//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json'}
    };
  }

  obtenerExtension(){
    this.extensionSvc.obtenerExtensiones().subscribe((res:any) =>{
      this.extensiones=res;
      this.dtTrigger.next();
    });
  }

 

  crearExtension(){
    this,this.formSubmited=true;
    if(this.registerForm.invalid){
      return;
    }
    //Realizar posteo
    this.extensionSvc.newExtension(this.registerForm.value).subscribe(res=>{
      Swal.fire({
        icon:'success',
        title:'Éxito',
        text:'Usuario creado correctamente',
        showConfirmButton:true

      }).then((result)=>{
        location.reload();
    
    });
  },(err)=>{
    const errorServer = JSON.parse(err.error);
    Swal.fire('Error',errorServer.message,'error');
  })
  }

  eliminarExtension(id:string){
   
   
    

    Swal.fire({
      icon:'question',
      title:'Desea eliminar esta  extensión ?',
      showCancelButton:true,
      confirmButtonText:'Confirmar'
    }).then((result)=>{
      if(result.isConfirmed){
        this.extensionSvc.deleteExtension(id).subscribe((res:any)=>{
          Swal.fire({
            icon:'success',
            title:'Extensión eliminada correctamente',
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
    this.extensionSvc.obtenerExtensionesId(id).subscribe(res=>{
      
      
      this.id_extension= res[0]['id']
      this.registerForm.setValue({
        nombre:res[0]['nombre'],
        unidad:res[0]['unidad'],
        cargo:res[0]['cargo'],
        extension:res[0]['extension']
        
      });

      $('#editarExtension').modal('toggle');
      $('#editarExtension').modal('show');

      // localStorage.setItem('idUser',res['id']);
    });

    

  }



  editarExtension(){

//console.log(this.registerForm.value);
    this.extensionSvc.editarExtension(this.id_extension.toString(), this.registerForm.value).subscribe(res=>{

      Swal.fire({
        icon:'success',
        title:'Exito',
        text:'El usuario se actualizo correctamente',
        confirmButtonText:'Ok'
      }).then((result)=>{

        if (result) {
            
          this.id_extension=0
          // localStorage.removeItem('idUser');
          // localStorage.removeItem('userId');
      
          location.reload();

        }

      });


    },(err)=>{
      
      //const errorEdit = JSON.parse(err.error);
      Swal.fire('Error', err.error.message, 'error');

    });

  }

  campoNoValido(campo:string): boolean{
    if(this.registerForm.get(campo).invalid && this.formSubmited){
      return true;
    }else{
      return false;
    }

  }

  exportexcel():void{
    let element = document.getElementById('excel-table');
    const ws:XLSX.WorkSheet=XLSX.utils.table_to_sheet(element);

    const wb:XLSX.WorkBook=XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb,ws,'Sheet1');

    XLSX.writeFile(wb,this.fileName);

  }

  onImprimir(){
    const encabezado=['Nombre','Unidad','Cargo','Extension']
   // const cuerpo=['alex ramirez','tics','desarrollador','1010']
  // console.log(this.extensiones);
   

    // const cuerpo=this.extensiones.map(record => {
    //   return [record.nombre, record.unidad, record.cargo, record.extension]
    // })

   
    const cuerpo= Object(this.extensiones).map(function(obj:any){
      const datos=[
        String(obj.nombre),
        String(obj.unidad),
        String(obj.cargo),
        String(obj.extension)
      ]
      console.log(datos)
      return datos;
     
    })
    

    this.srvImprimir.imprimir(encabezado,cuerpo,'Lista de Extensiones');
  }



}
