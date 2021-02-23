import { IRegisterForm } from '@core/interfaces/register.interface';
import { UsersService } from '@core/services/users.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersAdminService {

  constructor(private usersService: UsersService) { }

  register(user: IRegisterForm){
   return this.usersService.register(user);
  }
}
