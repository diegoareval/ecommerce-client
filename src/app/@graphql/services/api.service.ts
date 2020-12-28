import { Apollo } from 'apollo-angular';
import { Injectable } from '@angular/core';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private apollo: Apollo) {}

  login(email: string, password: string) {

  }
  me() {

  }
  getUsers() {

  }
  register() {
    
  }
}
