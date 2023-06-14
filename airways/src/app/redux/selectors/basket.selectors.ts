import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BasketPageState } from '@redux/models/state.models';

export const selectBasket = createFeatureSelector<BasketPageState>('basket');
const Sort = createSelector(selectBasket, (state) => state.sortType);

const Orders = createSelector(selectBasket, (state) => state.orders);
const TotalPrice = createSelector(selectBasket, (state) => state.totalPrice);

export const BasketSelectors = {
  Sort,
  Orders,
  TotalPrice,
};
