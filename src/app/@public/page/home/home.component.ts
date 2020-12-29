import { UsersService } from './../../../@core/services/users.service';
import { AuthService } from './../../../@core/services/auth.service';
import { ApiService } from './../../../@graphql/services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private auth: AuthService, private register: UsersService) { }

  ngOnInit(): void {
    this.auth.login("diego@gmail.com", "1234").subscribe(result => {
      console.log(result);
    });

    this.register.getUsers().subscribe(result => {
      console.log(result);
    });

    this.auth.getMe().subscribe(result => {
      console.log(result);
    });
  }

}
