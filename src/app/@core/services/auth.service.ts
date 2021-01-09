import { ISession, IMedata } from './../interfaces/session.interface';
import { Apollo } from 'apollo-angular';
import {
  LOGIN_QUERY,
  ME_DATA_QUERY,
} from './../../@graphql/operations/query/user';
import { ApiService } from './../../@graphql/services/api.service';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends ApiService {
  // creando observable
  accessVar = new Subject<IMedata>();

  // variable que contendra el observable
  accessVar$ = this.accessVar.asObservable();
  constructor(apollo: Apollo) {
    super(apollo);
  }

  // actualizar la sesion almacenada en el observable
  updateSession(newValue: IMedata) {
    this.accessVar.next(newValue);
  }

  start() {
    if (this.getSession() != null) {
      this.getMe().subscribe((result: IMedata) => {
        if (!result.status) {
          this.removeSession();
          return;
        }
        console.log('sesion iniciada');
        this.updateSession(result);
      });
      return;
    } else {
      this.updateSession({ status: false });
      console.log('sesion no iniciada');
    }
  }

  login(email: string, password: string) {
    return this.get(LOGIN_QUERY, {
      email,
      password,
      include: false
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
          Authorization: (this.getSession() as ISession).token,
        }),
      }
    ).pipe(
      map((result: any) => {
        return result.me;
      })
    );
  }



  setSession(token: string, expiresTimeinHours = 24) {
    // inicializar fecha
    const date = new Date();
    // sumar la fecha de expiracion a la hora actual
    date.setHours(date.getHours() + expiresTimeinHours);

    // crear payload de la session
    const session: ISession = {
      expiresIn: new Date(date).toISOString(),
      token,
    };
    // agregar token al localstorage
    localStorage.setItem('session', JSON.stringify(session));
  }

  getSession(): ISession {
    // obteniendo la sesion del local storage
    return JSON.parse(localStorage.getItem('session'));
  }

  removeSession() {
    // eliminar session del localstorage
    localStorage.removeItem('session');
    // actualizar la sesion
    this.updateSession({status: false})
  }
}
