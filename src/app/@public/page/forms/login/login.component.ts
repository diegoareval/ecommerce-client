import { AuthService } from '@core/services/auth.service';
import { ILoginForm } from './../../../../@core/interfaces/login.interface';
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

}
