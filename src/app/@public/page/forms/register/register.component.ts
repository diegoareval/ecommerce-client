import { EMAIL_PATTERN } from '@admin/core/constants/regex';
import { IResultRegister } from '@core/interfaces/register.interface';
import { UsersService } from '@core/services/users.service';
import { IRegisterForm } from '@core/interfaces/register.interface';
import { Component, OnInit } from '@angular/core';
import { basicAlert } from '@shared/alerts/toasts';
import { TYPE_ALERT } from '@shared/alerts/values.config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  emailPattern = EMAIL_PATTERN;
 register: IRegisterForm = {
   name: '',
   email: '',
   password: '',
   birthdate: '',
   lastname: ''
 }
  constructor(private api: UsersService, private router: Router) { }

  ngOnInit(): void {
    const data = new Date();
    data.setFullYear(new Date().getFullYear() - 18);
    this.register.birthdate = (data.toISOString()).substr(0, 10);
   // console.log(this.register);
    
  }
  private formatNumber(num: number | string){
    return (+num< 10)? `0${num}`: num;
  }
  dataAssign($event){
   console.log("getting data", $event);
   const date =  `${$event.year}-${this.formatNumber($event.month)}-${this.formatNumber($event.day)}`;
   this.register.birthdate = date;
  }

  add(){
  // console.log("enviando datos", this.register)
  this.api.register(this.register).subscribe((result: IResultRegister) =>{
    console.log("result",result);
    if(!result.status){
      basicAlert(TYPE_ALERT.ERROR, result.message);
      return;
    }
      basicAlert(TYPE_ALERT.SUCCESS, result.message);
      this.router.navigate(['/login'])
  })
  }
}
