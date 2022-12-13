import { Injectable } from '@angular/core';
import {LoginI} from '../../modelos/login.interface';
import {empleadoI} from '../../modelos/empleado.interface';
import { empleadoOneI } from 'src/app/modelos/empleadoOne.interface';
import {ResponseI} from '../../modelos/response.interface';
import {signupI } from '../../modelos/responsesignup.interface';
import { responseEmp } from 'src/app/modelos/responseemp.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { registro } from 'src/app/modelos/registro.interfafce';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url:string = "http://localhost:8080/";
  
  constructor(private http: HttpClient) {
    
  }

  ngOnInit(): void{
   
  }

  loginByUser(form: LoginI):Observable<ResponseI>{
    let direccion = this.url + "api/auth/signin";
    return this.http.post<ResponseI>(direccion, form);
  }

  sigin(form: registro):Observable<signupI>{
    let direccion = this.url + "api/auth/signup";
    return this.http.post<signupI>(direccion, form);
  }


  getAllempleadoss():Observable<empleadoI[]>{
    let direccion = this.url + "empleados";
    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${localStorage.getItem('token')}`)
    }
    
    return this.http.get<empleadoI[]>(direccion, header);
  }

  getOneEmpleado(id: any):Observable<empleadoI>{
    let direccion = this.url + "empleados/" + id;
    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${localStorage.getItem('token')}`)
    }
    return this.http.get<empleadoI>(direccion, header);
  }

  putEmpleados(form: empleadoOneI, id: any):Observable<responseEmp>{
    let direccion = this.url + "empleados/"+ id;
    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${localStorage.getItem('token')}`)
    }
    return this.http.put<responseEmp>(direccion, form, header);

  }

  deleteEmpleado(id: any):Observable<responseEmp>{
    let direccion = this.url +"empleados/" + id;
    let Options = {
      headers: new HttpHeaders({
        'Conten-type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }),
      body:id
    }
    return this.http.delete<responseEmp>(direccion, Options)
  }

  postEmpleado(form: empleadoOneI):Observable<responseEmp>{
    let direccion = this.url + "empleados/";
    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${localStorage.getItem('token')}`)
    }
    return this.http.post<responseEmp>(direccion, form, header);
  }
}
