import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { registro } from 'src/app/modelos/registro.interfafce';
import { ApiService } from 'src/app/servicios/api/api.service';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { signupI } from 'src/app/modelos/responsesignup.interface';
import { AlertasService } from 'src/app/servicios/alertas/alertas.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})

export class RegistroComponent{
    registroForm = new FormGroup({
      nombre: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })


  constructor(private api: ApiService,private router:Router, private alertas: AlertasService) { }

  ngOnInit(): void {  
    this.checkLocalStorage();
  }
  
  checkLocalStorage(): void{
    if(localStorage.getItem('token')){
      this.router.navigate(['dashboard']);
    }
  }

  onRegistro(form: any){
    this.api.sigin(form).subscribe(data =>{
      let dataResponse:signupI = data;
      if(dataResponse.message == "User registered successfully!"){
        this.alertas.showSucces('Datos salvados', 'Hecho')
        this.router.navigate(['login']);
      }
      else{
        this.alertas.showError('Verifique los datos', 'Error')
      }
    });
  }
}