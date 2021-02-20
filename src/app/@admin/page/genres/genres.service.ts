import { ApiService } from './../../../@graphql/services/api.service';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class GenresService extends ApiService{

  constructor(apollo: Apollo) {
    super(apollo)
   }
   addGenere(name: string) {
     
   }
}
