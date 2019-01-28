import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class MomentService {

  private minDate: string;
  private maxDate: string;
  public selectedDate: string;

  constructor() { 
    this.selectedDate = moment().format('YYYY-MM'); // default date when app is openened
    this.initMaxDate();
    this.initMinDate();
  }

  private initMaxDate() {
  }

  private initMinDate() {
  }



  getMaxDate() {
  }

  getMinDate() {
  }

  getStartOfMonthDate() {
    return moment(this.selectedDate).startOf('month').toDate();
  }

  getEndOfMonthDate() {
    return moment(this.selectedDate).endOf('month').toDate();
  }

  getCurrentDateObject(): moment.Moment{
    return moment();
  }

}
