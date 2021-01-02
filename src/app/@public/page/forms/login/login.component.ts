import { AuthService } from '@core/services/auth.service';
import { ILoginForm, IResultLogin } from '@core/interfaces/login.interface';
import { Component, OnInit } from '@angular/core';
import { basicAlert } from '@shared/alerts/toasts';
import { TYPE_ALERT } from '@shared/alerts/values.config';

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
        basicAlert(TYPE_ALERT.SUCCESS,result.message)
        return;
      }
      if(result.status){
        basicAlert(TYPE_ALERT.WARNING, result.message)
        return;
      }
      basicAlert(TYPE_ALERT.ERROR, result.message)
    });
  }

}
