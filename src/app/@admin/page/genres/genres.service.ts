import { map } from 'rxjs/operators';
import { ADD_GENRE, UPDATE_GENRE, BLOCK_GENRE } from './../../../@graphql/operations/mutation/genre';
import { ApiService } from './../../../@graphql/services/api.service';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class GenresService extends ApiService {
  constructor(apollo: Apollo) {
    super(apollo);
  }
  addGenre(genre: string) {    
    return this.set(ADD_GENRE, { genre }, {}).pipe(
      map((result: any) => {        
        return result.addGenre;
      })
    );
  }

  updateGenre(id: string, genre: string) {    
    return this.set(UPDATE_GENRE, { genre, id }, {}).pipe(
      map((result: any) => {        
        return result.updateGenre;
      })
    );
  }

  blockGenre(id: string){
    return this.set(BLOCK_GENRE, { id }, {}).pipe(
      map((result: any) => {        
        return result.blockGenre;
      })
    );
  }
}
