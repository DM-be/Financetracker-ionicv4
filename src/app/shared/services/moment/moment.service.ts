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

  public getSelectedDate() {
    return moment(this.selectedDate).toDate();
  }



  getMaxDate() {
  }

  getMinDate() {
  }

  public getStartOfMonthDate(date: string | Date) {
    return moment(date).startOf('month').toDate();
  }

  public getEndOfMonthDate(date: Date): Date {
    return moment(date).endOf('month').toDate();
  }

  public getCurrentDateObject(): Date {
    return moment().toDate();
  }

  public getNextMonthOfDate(date: Date): Date {
    return moment(date).add(1, 'M').toDate();
  }

  public isSelectedDateEqualToCurrentDate(): boolean {
    return this.selectedDate === moment().format('YYYY-MM');
  }

  public convertISOStringToDate(date: string): Date {
    return moment(date).toDate();

  }

}
