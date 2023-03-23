import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { CURRENCY_FORMAT } from 'src/app/constants/app-repo.constants';

@Pipe({
  name: 'transformCurrencyOrg'
})
export class TransformCurrencyOrgPipe implements PipeTransform {

  transform(number: any) {
    var suffixes = ['k', 'M', 'G', 'T', 'P', 'E'];
    if ((number != null) && (number !== '') && (!isNaN(Number.parseFloat(number)))) {
      //Conver to currency number
      var convertedNumber:any;
      if (number <= 10000){
        convertedNumber = new Intl.NumberFormat(CURRENCY_FORMAT.CURRENCY_LOCALE_ID.toString(), {
          style: 'currency',
          currency: CURRENCY_FORMAT.CURRENCY_CODE.toString(),
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        }).format(number);
      }else{
        let exp = Math.floor(Math.log(number) / Math.log(1000));
        convertedNumber = new Intl.NumberFormat(CURRENCY_FORMAT.CURRENCY_LOCALE_ID.toString(), {
          style: 'currency',
          currency: CURRENCY_FORMAT.CURRENCY_CODE.toString(),
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        }).format(number/1000)+suffixes[exp - 1];
      }
      //Add space between currency symbol and number
      convertedNumber = [convertedNumber.slice(0, 1), ' ', convertedNumber.slice(1)].join('');
      return convertedNumber;
    }
    return null;
  }

}

@NgModule({
  declarations: [TransformCurrencyOrgPipe],
  exports: [TransformCurrencyOrgPipe]
})

export class TransformCurrencyOrgPipeModule { }