import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { empleadoOneI } from 'src/app/modelos/empleadoOne.interface';
import { AlertasService } from 'src/app/servicios/alertas/alertas.service';
import { ApiService } from 'src/app/servicios/api/api.service';
import { responseEmp } from 'src/app/modelos/responseemp.interface';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.css']
})
export class NuevoComponent {
  constructor(private api: ApiService, private router: Router, private alertas: AlertasService) { }

  nuevoForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    direccion: new FormControl('', Validators.required),
    telefono: new FormControl('', Validators.required),
  })

  postForm(form: empleadoOneI) {
    console.log(form);
    this.api.postEmpleado(form).subscribe(data =>{
      let respuesta: responseEmp = data;
    if (respuesta.status == null) {
      this.alertas.showSucces('Datos salvados', 'Hecho')
    } else {
      this.alertas.showError('No se Modifico', 'Error')
    }
  })
  }

  salir() {
    this.router.navigate(['dashboard'])
  }


}
