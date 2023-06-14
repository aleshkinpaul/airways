import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyType } from '@redux/models/settings.models';

interface CurrencySettings {
  currencyLabel: '€' | '$' | '₽' | 'Zł';
  modification: number;
}

interface AvailableCurrency {
  USD: CurrencySettings;
  EUR: CurrencySettings;
  RUB: CurrencySettings;
  PLN: CurrencySettings;
}

@Pipe({
  name: 'currencyConverter',
})
export class CurrencyConverterPipe implements PipeTransform {
  private availableCurrency: AvailableCurrency = {
    USD: {
      currencyLabel: '$',
      modification: 1.09,
    },
    EUR: {
      currencyLabel: '€',
      modification: 1,
    },
    RUB: {
      currencyLabel: '₽',
      modification: 87.42,
    },
    PLN: {
      currencyLabel: 'Zł',
      modification: 4.49,
    },
  };

  transform(value: number | null, type: CurrencyType): string {
    if (value === null) return '';
    return this.getNewValue(value, type);
  }

  getNewValue(value: number, type: CurrencyType): string {
    const { currencyLabel, modification } = this.availableCurrency[type];
    return this.convertValue(value, currencyLabel, modification);
  }

  convertValue(
    val: number,
    currencyLabel: string,
    modification: number
  ): string {
    const newVal = +(val * modification).toFixed(2);
    return `${currencyLabel} ${newVal}`;
  }
}
