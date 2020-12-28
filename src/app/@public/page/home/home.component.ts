import { ApiService } from './../../../@graphql/services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.login("diego@gmail.com", "1234").subscribe(result => {
      console.log(result);
    });

    this.api.getUsers().subscribe(result => {
      console.log(result);
    });

    this.api.getMe().subscribe(result => {
      console.log(result);
    });
  }

}
