import { AuthService } from '@core/services/auth.service';
import { ILoginForm, IResultLogin } from '@core/interfaces/login.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
login: ILoginForm = {
  email: '',
  password: ''
};

constructor(private auth: AuthService){}

  ngOnInit(): void {
  }

  init(){
    this.auth.login(this.login.email, this.login.password).subscribe((result: IResultLogin)=>{
      console.log(result);
      if(result.status && result.token) {
        console.log("inicio de sesion correcto");
        return;
      }
      console.log("inicio de sesion no correcto");
      
    });
  }

}
