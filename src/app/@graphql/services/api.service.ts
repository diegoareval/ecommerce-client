import { LOGIN_QUERY, USERS_LIST_QUERY, ME_DATA_QUERY } from '@graphql/operations/query/user';
import { Apollo } from 'apollo-angular';
import { Injectable } from '@angular/core';
import {map} from "rxjs/operators"
import { DocumentNode } from 'graphql';


@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private apollo: Apollo) {}
    protected get(query: DocumentNode, variables: object = {}, context: object = {}){
      return this.apollo.watchQuery({
        query: query,
        variables,
        context,
        fetchPolicy: "network-only"
      }).valueChanges.pipe(map((result) => {
             return result.data
      }));
    }
  login(email: string, password: string) {
    return this.get(LOGIN_QUERY, {
      email,
      password
    })
  }
  getMe() {
    return this.get(ME_DATA_QUERY, {
      include: false
    } ,
    {
      headers: {
        Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVmZTdmMWRlMDk0YjA3MzI3Mjk1ZDc3OCIsIm5hbWUiOiJEaWVnbyIsImxhc3RuYW1lIjoiQXJldmFsbyIsImVtYWlsIjoiZGllZ29AZ21haWwuY29tIiwicm9sZSI6IkFETUlOIiwiaWQiOjF9LCJpYXQiOjE2MDkxNjQyOTcsImV4cCI6MTYwOTI1MDY5N30.AGMaNrjKcH1b_Plo6dEMxkIKzq41yegQSGUK0g2DWVo'
      }
    })

  }
  getUsers() {
    return this.get(USERS_LIST_QUERY, {
      include: true
    })
  }
  register() {
    
  }
}


