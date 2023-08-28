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

    nombre:['',[Validators.required]],
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required]],
    password2:['',[Validators.required]],
    role:['',[Validators.required]],
  },{
    Validators:this.passwordsIguales('password','password2')
  });

  

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
