
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

  protected set(
    mutation: DocumentNode,
    variables: object = {},
    context: object = {}
  ) {
    return this.apollo
    .mutate({
      mutation,
      variables,
      context
    })
    .pipe(
      map((result) => {
        return result.data;
      })
    );
}
  
}
