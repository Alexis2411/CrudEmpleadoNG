import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api/api.service';
import { empleadoI } from 'src/app/modelos/empleado.interface';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent{
  constructor(private api: ApiService, private router:Router){}

  empleados: empleadoI[] = [];

  ngOnInit():void{
    this.api.getAllempleadoss().subscribe(data =>{
      this.empleados = data;
    })
  }

  editarEmpleado(id: any){
    this.router.navigate(['editar', id]);
  }
  
  nuevoEmpleado(){
    this.router.navigate(['nuevo'])
  }

}
