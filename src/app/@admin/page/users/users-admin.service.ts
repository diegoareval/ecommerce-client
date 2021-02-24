import { map } from 'rxjs/operators';
import { UPDATE_USER, BLOCK_USER } from './../../../@graphql/operations/mutation/user';
import { Apollo } from 'apollo-angular';
import { ApiService } from './../../../@graphql/services/api.service';
import { IRegisterForm } from '@core/interfaces/register.interface';
import { UsersService } from '@core/services/users.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersAdminService extends ApiService{

  constructor(private usersService: UsersService, apollo: Apollo ) {
    super(apollo)
   }

  register(user: IRegisterForm){
   return this.usersService.register(user);
  }

  update(user: IRegisterForm){
     return this.set(UPDATE_USER,
      {
        user,
        include: false
      }).pipe(map((result: any)=>{
        return result.updateUser;
      }));
  }

  blockUser(id: string){
    return this.set(BLOCK_USER, { id }, {}).pipe(
      map((result: any) => {        
        return result.blockUser;
      })
    );
  }
}
