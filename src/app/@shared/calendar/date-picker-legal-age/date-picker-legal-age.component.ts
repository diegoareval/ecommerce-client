import { Component, OnInit, Output, EventEmitter, ComponentFactory, ComponentFactoryResolver } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-date-picker-legal-age',
  templateUrl: './date-picker-legal-age.component.html',
  styleUrls: ['./date-picker-legal-age.component.scss']
})
export class DatePickerLegalAgeComponent implements OnInit {
  model: NgbDateStruct;

  currentDay = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate()
  }
  minDate: NgbDateStruct = {
    year: this.currentDay.year - 100,
    month: this.currentDay.month,
    day: this.currentDay.day
  };
  maxDate: NgbDateStruct = {
    year: this.currentDay.year - 18,
    month: this.currentDay.month,
    day: this.currentDay.day
  };
  @Output()  newDate = new EventEmitter<NgbDateStruct>();
  
  constructor() { 
    
  }
  
  ngOnInit(): void {
  }
  selectDateChange(){
    console.log(this.model);
   this.newDate.emit(this.model)
  }
}
