import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: FormGroup;
  isInvalid: boolean = false;
  
  constructor(private router: Router ,private authService: AuthService) { 
    this.model = new FormGroup(
      {
        'correo': new FormControl('',[Validators.required, Validators.pattern('/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/')]),
        'contrasena': new FormControl('',Validators.required)
      }
    )
  }

  ngOnInit() {
  }

  onLogin(){
    var email =this.model.controls['correo'].value,//'test@apptiendaangularreact.com',// 
        pass = this.model.controls['contrasena'].value;//'@123456';//
    if(email == "" || pass == "") {
      this.isInvalid = true;
    }
    else {
      this.authService.loginEmailUser(email,pass)
      .then((res)=>{
        console.dir(res);
        this.router.navigate([{ outlets: { primary: ['main'], principal: ['lista'] } }])
      }).catch(err => {
        console.dir(err);
        $('.toast').toast('show');
      });
    }
  }
}
