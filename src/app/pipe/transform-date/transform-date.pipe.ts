import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { APP_SETTING, UI_SETTINGS } from 'src/app/constants/app-repo.constants';

@Pipe({
  name: 'transformDate'
})
export class TransformDatePipe implements PipeTransform {

  constructor(private datePipe: DatePipe) {
  }
  
  transform(date: Date | string): string {
    if (date) {
      date = new Date(date);
      let dateFormat:any =  APP_SETTING.DATE_FORMAT;
      return this.datePipe.transform(date, dateFormat);
    }
    return null;
  }

}
