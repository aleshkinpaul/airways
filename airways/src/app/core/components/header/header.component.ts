import { Component, HostListener, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BookingActions } from '@redux/actions/booking-page.actions';
import { BookingPageState } from '@redux/models/state.models';
import { MatDialog } from '@angular/material/dialog';
import { AuthComponent } from '@core/components/auth/auth.component';

import { basket } from '@core/svg/SVG';
import { IconService } from '@core/services/icon.service';
import { BasketSelectors } from '@redux/selectors/basket.selectors';
import { Order } from '@redux/models/basket.models';
import { Observable, Subscription } from 'rxjs';
import { BookingSelectors } from '@redux/selectors/booking-page.selectors';
import { MainPageSelectors } from '@redux/selectors/main-page.selectors';
import { AuthSelectors } from '@redux/selectors/auth.selectors';
import { AuthActions } from '@redux/actions/auth.actions';
import { MainPageActions } from '@redux/actions/main-page.actions';

const ICON = {
  name: 'basket',
  source: basket,
};

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnDestroy {
  public isMainPage = true;
  public isUserSignIn = false;
  public isHamburgerMenuActive = false;
  public ordersCount$: Observable<Order[]> = this.store.select(
    BasketSelectors.Orders
  );
  public isEditorOpen = false;

  onBookingPage$ = this.store.select(BookingSelectors.onBookingPageSelector);
  onFlightPage$ = this.store.select(
    BookingSelectors.currentPageDirectionSelector
  );
  windowWidth: number = window.innerWidth;
  public user$ = this.store.select(AuthSelectors.AuthUserSelector);

  private IsLogIn$ = this.store.select(AuthSelectors.IsLogIn);

  public isEditorOpen$ = this.store.select(MainPageSelectors.IsEditorOpen);

  constructor(
    private router: Router,
    private store: Store<BookingPageState>,
    private dialog: MatDialog,
    private iconService: IconService
  ) {
    this.addPathToIcon();
    this.addIsLog();

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (
          event.url.startsWith('/booking-page') &&
          !event.url.startsWith('/booking-page/booking-summary')
        ) {
          this.store.dispatch(BookingActions.OnBookingPage());
        } else {
          this.store.dispatch(BookingActions.OutBookingPage());
        }

        this.isMainPage = event.url.startsWith('/main') || event.url === '/';
      }
    });
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  @HostListener('window:resize')
  onWindowResize() {
    this.windowWidth = window.innerWidth;
    if (this.windowWidth >= 750) {
      this.isHamburgerMenuActive = false;
    }
  }

  public openAuthDialog() {
    if (!this.isUserSignIn) this.dialog.open(AuthComponent);
  }

  public toMainPage() {
    this.store.dispatch(BookingActions.ClearBookingPageState());
    this.router.navigate(['main']);
    this.store.dispatch(BookingActions.OutBookingPage());
    this.store.dispatch(MainPageActions.IsEditorOpen({ isEditorOpen: false }));
  }

  public toShoppingCardPage() {
    if (this.isUserSignIn) {
      this.router.navigate(['shopping-card']);
    }
  }

  private addPathToIcon() {
    this.iconService.add(ICON.name, ICON.source);
  }

  private addIsLog() {
    this.IsLogIn$.subscribe((isLog) => {
      if (isLog) this.dialog.closeAll();
      this.isUserSignIn = isLog;
    });
  }

  toggleHamburgerMenu() {
    this.isHamburgerMenuActive = !this.isHamburgerMenuActive;
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (event.target instanceof HTMLElement) {
      if (
        !document.querySelector('.hamburger-icon')?.contains(event.target) &&
        !document.querySelector('.hamburger-menu')?.contains(event.target) &&
        !document.querySelector('.ng-trigger')?.contains(event.target) &&
        !event.target.classList.contains('mdc-list-item__primary-text') &&
        !event.target.classList.contains('mat-mdc-option')
      ) {
        this.isHamburgerMenuActive = false;
      }
    }
  }

  logOut() {
    this.store.dispatch(AuthActions.logOut());
  }

  toAccountPage() {
    this.router.navigate(['shopping-card/account-page']);
  }
}
