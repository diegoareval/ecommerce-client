import { IRegisterForm } from './../../../../@core/interfaces/register.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
 register: IRegisterForm = {
   name: '',
   email: '',
   password: '',
   birthday: '',
   lastname: ''
 }
  constructor() { }

  ngOnInit(): void {
    const data = new Date();
    data.setFullYear(new Date().getFullYear() - 18);
    this.register.birthday = (data.toISOString()).substr(0, 10);
    console.log(this.register);
    
  }
  private formatNumber(num: number | string){
    return (+num< 10)? `0${num}`: num;
  }
  dataAssign($event){
   console.log("getting data", $event);
   const date =  `${$event.year}-${this.formatNumber($event.month)}-${this.formatNumber($event.day)}`;
   this.register.birthday = date;
  }

  add(){
  console.log("enviando datos", this.register)
  }
}
