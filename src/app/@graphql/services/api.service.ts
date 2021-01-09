import { REGISTER_USER } from './../operations/mutation/user';
import { IRegisterForm } from './../../@core/interfaces/register.interface';
import {
  LOGIN_QUERY,
  USERS_LIST_QUERY,
  ME_DATA_QUERY,
} from '@graphql/operations/query/user';
import { Apollo } from 'apollo-angular';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { DocumentNode } from 'graphql';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private apollo: Apollo) {}
  protected get(
    query: DocumentNode,
    variables: object = {},
    context: object = {}
  ) {
    return this.apollo
      .watchQuery({
        query: query,
        variables,
        context,
        fetchPolicy: 'network-only',
      })
      .valueChanges.pipe(
        map((result) => {
          return result.data;
        })
      );
  }
   register(user: IRegisterForm){
     return this.apollo.mutate({
       mutation: REGISTER_USER,
       variables: {
         user,
         include: false
       }
     }).pipe(map((result)=>{
       return result.data;
     }))
   }
}
