import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { empleadoOneI } from 'src/app/modelos/empleadoOne.interface';
import { ApiService } from 'src/app/servicios/api/api.service';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { ResponseI } from 'src/app/modelos/response.interface';
import { AlertasService } from 'src/app/servicios/alertas/alertas.service';
import { responseEmp } from 'src/app/modelos/responseemp.interface';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent {
  constructor(private activeRouter: ActivatedRoute, private router: Router, private api:ApiService, private alertas: AlertasService){}

  datosEmpleado: empleadoOneI | undefined;
  editarForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    direccion: new FormControl('', Validators.required),
    telefono: new FormControl('', Validators.required)
})

  ngOnInit():void{
    let empleadoOneId = this.activeRouter.snapshot.paramMap.get('id');
    this.api.getOneEmpleado(empleadoOneId).subscribe(data =>{
      this.datosEmpleado=data
      this.editarForm.setValue({
        'nombre': this.datosEmpleado.nombre,
        'direccion': this.datosEmpleado.direccion,
        'telefono': this.datosEmpleado.telefono
      })
   })
  }

  getToken(){
    return localStorage.getItem('token');
  }

  postForm(form: empleadoOneI){
    this.api.putEmpleados(form, this.datosEmpleado?.id).subscribe(data => {
      let respuesta:responseEmp = data;
      if(respuesta.status == null){
        this.alertas.showSucces('Datos modificados', 'Hecho')
      }else{
        this.alertas.showError('No se Modifico', 'Error')
      }
    });
  }

  eliminar(){
    let datos: empleadoOneI = this.datosEmpleado?.id;
    this.api.deleteEmpleado(datos).subscribe(data =>{
      let respuesta:responseEmp = data;
      if(respuesta.status == null){
        this.alertas.showSucces('Datos Borrados', 'Hecho')
        this.router.navigate(['dashboard'])
      }else{
        this.alertas.showError('No se Borro', 'Error')
      }
    })
  }

  salir(){
    this.router.navigate(['dashboard'])
  }

}
