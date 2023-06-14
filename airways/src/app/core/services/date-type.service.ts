import { Injectable } from '@angular/core';
import { DateAdapter } from '@angular/material/core';

@Injectable({
  providedIn: 'root',
})
export class DateTypeService {
  constructor(public adapter: DateAdapter<Date>) {}

  changeDateType(dateType: string) {
    if (dateType === 'MM/DD/YYYY') {
      this.adapter.setLocale('en-US');
    } else if (dateType === 'DD/MM/YYYY') {
      this.adapter.setLocale('en-GB');
    } else if (dateType === 'YYYY/DD/MM') {
      this.adapter.setLocale('en-ZA');
    } else if (dateType === 'YYYY/MM/DD') {
      this.adapter.setLocale('en-ZA');
    }
  }
}
