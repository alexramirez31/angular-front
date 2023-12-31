import { Component, OnInit,OnDestroy } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

import  Swal from 'sweetalert2';

declare var $:any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit,OnDestroy {
  dtOptions: DataTables.Settings = {};
 
  usuarios:Usuario[]=[];
  dtTrigger: Subject<any> = new Subject<any>();
  
  formSubmited =false;

  Roles: any =['admin','editor'];

  public registerForm= this.fb.group({

    nombre:['',[Validators.required]],
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required]],
    password2:['',[Validators.required]],
    role:['',[Validators.required]],
  },{
    Validators:this.passwordsIguales('password','password2')
  });

  //creando formulario reactivo
  public cambioContrasena = this.fb.group({
    oldPassword:[''],
    newPassword:['']
  });

  constructor( private usuarioSvc: UsuarioService,private fb:FormBuilder,private router:Router) { }
 
  ngOnInit(): void {
    this.obtenerUsuario();
    this.dtOptions = {
      
      pageLength: 10,
      searching:true,
      responsive:true,
      info:false,
      language:{url:'//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json'}
    };
  }

  obtenerUsuario(){
    this.usuarioSvc.obtenerUsuarios().subscribe((res:any) =>{
      this.usuarios=res;
      this.dtTrigger.next();
    });
  }

  crearUsuario(){
    this,this.formSubmited=true;
    if(this.registerForm.invalid){
      return;
    }
    //Realizar posteo
    this.usuarioSvc.newUsuario(this.registerForm.value).subscribe(res=>{
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

  cambiarPass(id:string){
    let idUser =id;
    
    $('#cambiarPass').modal('toggle');
    $('#cambiarPass').modal('show');

    localStorage.setItem('userId',idUser);
  }

  changePassword(){
    this.usuarioSvc.cambioPassword(localStorage.getItem('userId'),this.cambioContrasena.value).subscribe(res=>{
      Swal.fire({
        icon:'success',
        title: 'El password se actualizo correctamento',
        confirmButtonText:'Ok'
      }).then((result)=>{
        if (result){
          location.reload();
          localStorage.removeItem('userId')
        }
      });
    }, (err)=>{
      const errorPass = JSON.parse(err.error);
      Swal.fire('Error',errorPass.message,'error');
    });

  }
  
  llenarForm(id:string){
    this.usuarioSvc.obtenerIdUsuario(id).subscribe(res=>{
      
      console.log(res);
      this.registerForm.setValue({
        nombre:res['nombre'],
        email:res['email'],
        password:'',
        password2:'',
        role:res['role']
      });

      $('#editarUsuario').modal('toggle');
      $('#editarUsuario').modal('show');

      localStorage.setItem('idUser',res['id']);
    });

    

  }

  editarUsuario(){
    //console.log(this.registerForm.value);
    this.usuarioSvc.editarUsuario(localStorage.getItem('idUser'), this.registerForm.value).subscribe(res=>{

      Swal.fire({
        icon:'success',
        title:'Exito',
        text:'El usuario se actualizo correctamente',
        confirmButtonText:'Ok'
      }).then((result)=>{

        if (result) {
            
          localStorage.removeItem('idUser');
          localStorage.removeItem('userId');
       
          location.reload();

        }

      });


    },(err)=>{
      
      //const errorEdit = JSON.parse(err.error);
      Swal.fire('Error', err.error.message, 'error');

    });


  }


  eliminarUsuario(id:string){
    if (id==localStorage.getItem('usuarioId')){
      Swal.fire('Error','No puede eliminar un usuario activo','error');
    }else{

    

    Swal.fire({
      icon:'question',
      title:'Desea eliminar este usuario ?',
      showCancelButton:true,
      confirmButtonText:'Confirmar'
    }).then((result)=>{
      if(result.isConfirmed){
        this.usuarioSvc.deleteUsuario(id).subscribe((res:any)=>{
          Swal.fire({
            icon:'success',
            title:'Usuario elimindado correctamente',
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
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  get roles(){
    return this.registerForm.get('role');
  }

  changeRole(evento){
    console.log(evento.target.value);    

    this.roles.setValue(evento.target.value,{
      onlySelt:true
    })

  }

  campoNoValido(campo:string): boolean{
    if(this.registerForm.get(campo).invalid && this.formSubmited){
      return true;
    }else{
      return false;
    }

  }

  contrasenasNoValidas(){
    const pass1=this.registerForm.get('password').value;
    const pass2=this.registerForm.get('password2').value;
    if((pass1 !=pass2) && this.formSubmited){
      return true;
    }else{
      return false;
    }
  }

  passwordsIguales(pass1Name: string,pass2Name:string){
    return (FormGroup: FormGroup)=>{
      const pass1Control = FormGroup.get(pass1Name);
      const pass2Control = FormGroup.get(pass2Name);

      if (pass1Control.value == pass2Control.value){
        pass2Control.setErrors(null);
      }else{
        pass2Control.setErrors({noEsIgual:true});
      }
    }
  }

}
