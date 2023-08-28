import { Component } from '@angular/core';
import { FormBuilder,FormGroup,Validators  } from '@angular/forms'
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  {
  formSubmited =false;

  Roles: any =['admin','editor'];

  public registerForm= this.fb.group({

    nombre:['sergio',[Validators.required]],
    email:['sergio@gmail.com',[Validators.required,Validators.email]],
    password:['123456',[Validators.required]],
    password2:['123456',[Validators.required]],
    role:['',[Validators.required]],
  })

  

  constructor(private fb:FormBuilder,private router:Router,private usuarioSvc:UsuarioService) { }


  crearUsuario(){
    this,this.formSubmited=true;
    if (this.registerForm.invalid){
      return;
    }
    //realizar posteo
    this.usuarioSvc.newUsuario(this.registerForm.value).subscribe(
      res=>{
        Swal.fire('Éxito','Usuario creado correctamente','success');

      },(err)=>{
        const errorServer = JSON.parse(err.error);
        Swal.fire('Error',errorServer.message,'error');
      });
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
}
