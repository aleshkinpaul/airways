import { Component, Input, OnChanges } from '@angular/core';
import { IAlternativeFlight, IPrice } from '@redux/models/main-page.models';

@Component({
  selector: 'app-alternative-flight-card',
  templateUrl: './alternative-flight-card.component.html',
  styleUrls: ['./alternative-flight-card.component.scss'],
})
export class AlternativeFlightCardComponent implements OnChanges {
  @Input() flightInfo!: IAlternativeFlight;
  @Input() chosenCurrency = 'EUR';
  @Input() activeIndex = 0;

  public price?: number | null = 0;
  
  ngOnChanges() {
    this.price = this.flightInfo.price
      ? this.flightInfo.price[this.chosenCurrency.toLowerCase() as keyof IPrice]
      : null;
  }
}
