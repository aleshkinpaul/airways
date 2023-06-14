import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Order } from '@redux/models/basket.models';
import { BasketSelectors } from '@redux/selectors/basket.selectors';
import { BaskedActions } from '@redux/actions/bascet.actions';
import { CurrencyType } from '@redux/models/settings.models';
import { SettingsSelectors } from '@redux/selectors/settings.selectors';
import { Router } from '@angular/router';
import {
  SortOrdersSettings,
  SortSettings,
} from '@shopping/pipes/sort-orders.pipe';
import { BookingActions } from '@redux/actions/booking-page.actions';
import { AuthSelectors } from '@redux/selectors/auth.selectors';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountPageComponent implements OnInit, OnDestroy {
  public totalPrice$: Observable<number> = this.store.select(
    BasketSelectors.TotalPrice
  );

  public currency$: Observable<CurrencyType> = this.store.select(
    SettingsSelectors.CurrencySelector
  );

  public sortType$: Observable<SortSettings> = this.store.select(
    BasketSelectors.Sort
  );

  private IsLogIn$ = this.store.select(AuthSelectors.IsLogIn);

  private orderSubscription!: Subscription;
  private sortSubscription!: Subscription;
  private IsLogInSub!: Subscription;

  public orders!: Order[];

  public promoCode = '';

  public smallPage = false;

  public sortHelper = false;

  constructor(private store: Store, private router: Router) {
    this.IsLogInSub = this.IsLogIn$.subscribe((isLogIn) => {
      if (!isLogIn) this.router.navigate(['/main']);
    });
  }

  ngOnInit(): void {
    this.getOrders();
    this.onResize();
    this.getSortSubscription();
  }

  ngOnDestroy(): void {
    // выбрасывало ошибку при нажатии на buy now
    // this.orderSubscription.unsubscribe();
    // this.sortSubscription.unsubscribe();
    this.IsLogInSub.unsubscribe();
  }

  @HostListener('window:resize')
  onResize() {
    const width = window.innerWidth;
    if (width > 1100 && this.smallPage) this.smallPage = false;
    else if (width <= 1100 && !this.smallPage) this.smallPage = true;
  }

  public get ordersChecked(): number {
    return this.orders.reduce((acc, el) => {
      if (el.isChecked) acc += 1;
      return acc;
    }, 0);
  }

  public activatePromoCode() {
    this.store.dispatch(BaskedActions.PromoCode({ code: this.promoCode }));
    this.promoCode = '';
  }

  public addNewTrip() {
    this.store.dispatch(BookingActions.ClearBookingPageState());
    this.router.navigate(['/main']);
  }

  private getOrders(): void {
    const orders$: Observable<Order[]> = this.store.select(
      BasketSelectors.Orders
    );
    this.orderSubscription = orders$.subscribe((orders: Order[]) => {
      this.sortHelper = false;
      this.orders = orders;
    });
  }

  sortOrders(sortType: SortOrdersSettings) {
    this.store.dispatch(BaskedActions.SortAction({ sortType }));
  }

  private getSortSubscription() {
    this.sortSubscription = this.sortType$.subscribe(() => {
      this.sortHelper = true;
    });
  }

  toBookingSummary() {
    this.router.navigate(['/booking-page/booking-summary']);
  }
}
