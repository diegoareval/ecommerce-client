import { Apollo } from 'apollo-angular';
import {
  LOGIN_QUERY,
  ME_DATA_QUERY,
} from './../../@graphql/operations/query/user';
import { ApiService } from './../../@graphql/services/api.service';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends ApiService {
  constructor(apollo: Apollo) {
    super(apollo);
  }

  login(email: string, password: string) {
    return this.get(LOGIN_QUERY, {
      email,
      password,
    }).pipe(
      map((result: any) => {
        return result.login;
      })
    );
  }
  getMe() {
    return this.get(
      ME_DATA_QUERY,
      {
        include: false,
      },
      {
        headers: new HttpHeaders({
          Authorization:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVmZTdmMWRlMDk0YjA3MzI3Mjk1ZDc3OCIsIm5hbWUiOiJEaWVnbyIsImxhc3RuYW1lIjoiQXJldmFsbyIsImVtYWlsIjoiZGllZ29AZ21haWwuY29tIiwicm9sZSI6IkFETUlOIiwiaWQiOjF9LCJpYXQiOjE2MDkxNjQyOTcsImV4cCI6MTYwOTI1MDY5N30.AGMaNrjKcH1b_Plo6dEMxkIKzq41yegQSGUK0g2DWVo',
        }),
      }
    ).pipe(
      map((result: any) => {
        return result.me;
      })
    );
  }

  register() {}
}
