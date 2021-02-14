import { Apollo } from 'apollo-angular';
import { ApiService } from './../../@graphql/services/api.service';
import { Injectable } from '@angular/core';
import {DocumentNode} from "graphql"
@Injectable({
  providedIn: 'root'
})
export class TablePaginationService extends ApiService{

  constructor(apollo: Apollo) { 
    super(apollo);
  }
  getCollectionData(query: DocumentNode, variables: object = {}, context: object = {}) {
    return this.get(query, variables, context);
  }
}
