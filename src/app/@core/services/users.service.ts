import { Apollo } from 'apollo-angular';
import { ApiService } from './../../@graphql/services/api.service';
import { USERS_LIST_QUERY } from './../../@graphql/operations/query/user';
import { Injectable } from '@angular/core';
import {map} from "rxjs/operators"

@Injectable({
  providedIn: 'root'
})
export class UsersService extends ApiService{

  constructor(apollo: Apollo) {
    super(apollo)
   }

  getUsers() {
    return this.get(USERS_LIST_QUERY, {
      include: true,
    }).pipe(
      map((result: any) =>{
        return result.users;
      }))
  }
}
