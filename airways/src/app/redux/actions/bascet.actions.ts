import { createAction, props } from '@ngrx/store';
import { Order } from '@redux/models/basket.models';
import { SortSettings } from '@shopping/pipes/sort-orders.pipe';

const SortAction = createAction('[BASKET PAGE] Sort', props<SortSettings>());
const AddFlight = createAction('[BASKET PAGE] Add Flight', props<Order>());
const PromoCode = createAction(
  '[BASKET PAGE] Promo Code',
  props<{ code: string }>()
);

const DeleteFlight = createAction(
  '[BASKET PAGE] Delete Flight',
  props<{ id: string }>()
);

const EditFlight = createAction(
  '[BASKET PAGE] Edit Flight',
  props<{ id: string }>()
);

const CheckFlight = createAction(
  '[BASKET PAGE] Check Flight',
  props<{ id: string }>()
);

const Pay = createAction('[BASKET PAGE] Pay');

export const BaskedActions = {
  SortAction,
  AddFlight,
  PromoCode,
  DeleteFlight,
  EditFlight,
  Pay,
  CheckFlight,
};
