import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertasService } from 'src/app/servicios/alertas/alertas.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private router: Router, private alertas: AlertasService){}
  salir(){
    localStorage.removeItem('token');
    localStorage.removeItem('typeToken');
    this.alertas.showSucces('Saliendo sesión', 'Hecho')
    this.router.navigate(['login']);
  }
}
