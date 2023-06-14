export type CurrencyType = 'EUR' | 'USD' | 'RUB' | 'PLN';
export type DateType =
  | 'MM/DD/YYYY'
  | 'DD/MM/YYYY'
  | 'YYYY/DD/MM'
  | 'YYYY/MM/DD';

export interface CurrencyI {
  currency: CurrencyType;
}

export interface DateI {
  dateType: DateType;
}
