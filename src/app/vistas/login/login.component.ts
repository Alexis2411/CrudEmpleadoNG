import { Component } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {ApiService} from '../../servicios/api/api.service';
import {LoginI} from '../../modelos/login.interface';
import {Router} from '@angular/router'
import {ResponseI} from '../../modelos/response.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  loginForm = new FormGroup({
    username : new FormControl('', Validators.required),
    password : new FormControl('', Validators.required)
  })

  constructor(private api:ApiService, private router:Router) {
  }

  ngOnInit(): void{
    this.checkLocalStorage();
  }
  
  checkLocalStorage(): void{
    if(localStorage.getItem('token')){
      this.router.navigate(['dashboard']);
    }
  }

  onLogin(form: any){
    this.api.loginByUser(form).subscribe(data =>{
      let dataResponse:ResponseI = data;
      console.log(data);
      if(dataResponse.accessToken != null){
        localStorage.setItem('token', dataResponse.accessToken);
        localStorage.setItem('typeToken', dataResponse.tokenType);
        this.router.navigate(['dashboard']);
      }
    });
  }
}
