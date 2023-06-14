import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { SettingsSelectors } from '@redux/selectors/settings.selectors';
import { PersonTotal } from '@redux/models/booking-page.models';

@Component({
  selector: 'app-prise',
  templateUrl: './prise.component.html',
  styleUrls: ['./prise.component.scss'],
})
export class PriseComponent {
  @Input() total!: PersonTotal;
  currency = 'EUR';
  public currency$ = this.store.select(SettingsSelectors.CurrencySelector);

  constructor(private store: Store) {}
}
