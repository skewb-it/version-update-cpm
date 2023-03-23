import { Pipe, PipeTransform, NgModule } from '@angular/core';
import { CURRENCY_FORMAT } from 'src/app/constants/app-repo.constants';

@Pipe({
  name: 'transformCurrency'
})
export class TransformCurrencyPipe implements PipeTransform {

  transform(number: any) {
    if ((number != null) && (number !== '') && (!isNaN(Number.parseFloat(number)))) {
      //Conver to currency number
      let convertedNumber = new Intl.NumberFormat(CURRENCY_FORMAT.CURRENCY_LOCALE_ID.toString(), { style: 'currency', currency: CURRENCY_FORMAT.CURRENCY_CODE.toString() }).format(number);
      //Add space between currency symbol and number
      convertedNumber = [convertedNumber.slice(0, 1), ' ', convertedNumber.slice(1)].join('');
      return convertedNumber;
    }
    return null;
  }

}

@NgModule({
  declarations: [TransformCurrencyPipe],
  exports: [TransformCurrencyPipe]
})

export class TransformCurrencyPipeModule { }
