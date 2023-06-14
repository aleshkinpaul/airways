import { BasketPageState } from '@redux/models/state.models';
import { createReducer, on } from '@ngrx/store';
import { BaskedActions } from '@redux/actions/bascet.actions';
import { Order } from '@redux/models/basket.models';

const totalPrise = (orders: Order[] | undefined) => {
  if (orders === undefined) return 0;
  return orders.reduce((acc, order) => {
    if (order.isChecked) acc += +order.total.totalPrice;
    return acc;
  }, 0);
};

const checkFlight = (orders: Order[], id: string) => {
  return orders.map((el) => {
    if (el.id === id) {
      el = { ...el, isChecked: !el.isChecked };
    }
    return el;
  });
};

const checkedFlight = (orders: Order[]) => {
  return orders.filter((el) => !el.isChecked);
};
export const promoF = (
  promoCode: string,
  currentPromoCode: string,
  totalPrice: number,
  discont: number
): number =>
  promoCode === currentPromoCode ? totalPrice * discont : totalPrice;

export const deleteFlight = (flight: Order[], id: string): Order[] =>
  flight.filter((el) => el.id !== id);

export const initialState: BasketPageState = {
  sortType: { sortType: 'NoSort' },
  orders: [
    // {
    //   flights: {
    //     twoWays: true,
    //     forwardFlight: {
    //       seats: {
    //         total: 676,
    //         avaible: 319,
    //       },
    //       flightNumber: 'PS-3911',
    //       timeMins: 412,
    //       form: {
    //         key: 'AMS',
    //         name: 'Amsterdam-Schiphol',
    //         city: 'Grodno',
    //         gmt: '+1.0',
    //         country: 'Netherlands',
    //       },
    //       to: {
    //         key: 'MAD',
    //         name: 'Barajas',
    //         city: 'Minsk',
    //         gmt: '+1.0',
    //         country: 'Spain',
    //       },
    //       takeoffDate: '2022-05-22T11:48:00.000Z',
    //       landingDate: '2022-05-22T13:36:00.000Z',
    //       price: {
    //         eur: 470,
    //         usd: 518.457,
    //         rub: 41580.9,
    //         pln: 2157.2999999999997,
    //       },
    //     },
    //     backFlight: {
    //       seats: {
    //         total: 676,
    //         avaible: 319,
    //       },
    //       flightNumber: 'PS-3911',
    //       timeMins: 412,
    //       form: {
    //         key: 'AMS',
    //         name: 'Amsterdam-Schiphol',
    //         city: 'Amsterdam',
    //         gmt: '+1.0',
    //         country: 'Netherlands',
    //       },
    //       to: {
    //         key: 'MAD',
    //         name: 'Barajas',
    //         city: 'Madrid',
    //         gmt: '+1.0',
    //         country: 'Spain',
    //       },
    //       takeoffDate: '2023-09-22T16:48:00.000Z',
    //       landingDate: '2023-09-22T23:36:00.000Z',
    //       price: {
    //         eur: 470,
    //         usd: 518.457,
    //         rub: 41580.9,
    //         pln: 2157.2999999999997,
    //       },
    //     },
    //   },
    //   passengersInfo: {
    //     adult: [
    //       {
    //         firstName: 'Pavel',
    //         lastName: 'arabei',
    //         gender: 'male',
    //         birthdayDate: '2023-05-01T22:00:00.000Z',
    //         invalid: 'true',
    //         baggageBig: 0,
    //         baggageSmall: 0,
    //         seat: '33',
    //       },
    //       {
    //         firstName: 'Anna',
    //         lastName: 'arabei',
    //         gender: 'female',
    //         birthdayDate: '2023-05-01T22:00:00.000Z',
    //         invalid: 'false',
    //         baggageBig: 0,
    //         baggageSmall: 0,
    //         seat: '33',
    //       },
    //       {
    //         firstName: 'Anna',
    //         lastName: 'arabei',
    //         gender: 'female',
    //         birthdayDate: '2023-05-01T22:00:00.000Z',
    //         invalid: 'false',
    //         baggageBig: 0,
    //         baggageSmall: 0,
    //         seat: '33',
    //       },
    //     ],
    //     child: [
    //       {
    //         firstName: 'Pavel',
    //         lastName: 'arabei',
    //         gender: 'male',
    //         birthdayDate: '2023-05-01T22:00:00.000Z',
    //         invalid: 'true',
    //         baggageBig: 0,
    //         baggageSmall: 0,
    //         seat: '33',
    //       },
    //     ],
    //     infant: [
    //       {
    //         firstName: 'Pavel',
    //         lastName: 'arabei',
    //         gender: 'male',
    //         birthdayDate: '2023-05-01T22:00:00.000Z',
    //         invalid: 'true',
    //         baggageBig: 0,
    //         baggageSmall: 0,
    //         seat: '33',
    //       },
    //     ],
    //     details: {
    //       countryCode: '+355',
    //       phone: '7777777',
    //       email: 'Pahsdfsdf@gmail.com',
    //     },
    //   },
    //   passengersCount: {
    //     adults: 3,
    //     children: 1,
    //     infants: 1,
    //   },
    //   total: {
    //     adult: {
    //       name: 'adult',
    //       count: 3,
    //       fare: 2820,
    //       tax: 1410,
    //       allPrice: 4230,
    //     },
    //     child: {
    //       name: 'child',
    //       count: 2,
    //       fare: 1316,
    //       tax: 658,
    //       allPrice: 1974,
    //     },
    //     infant: {
    //       name: 'infant',
    //       count: 2,
    //       fare: 376,
    //       tax: 188,
    //       allPrice: 564,
    //     },
    //     totalPrice: 6768,
    //   },
    //   id: 'SomeId',
    //   isChecked: false,
    // },
    // {
    //   flights: {
    //     twoWays: true,
    //     forwardFlight: {
    //       seats: {
    //         total: 300,
    //         avaible: 294,
    //       },
    //       flightNumber: 'PS-3911',
    //       timeMins: 412,
    //       form: {
    //         key: 'AMS',
    //         name: 'Amsterdam-Schiphol',
    //         city: 'Amsterdam',
    //         gmt: '+1.0',
    //         country: 'Netherlands',
    //       },
    //       to: {
    //         key: 'MAD',
    //         name: 'Barajas',
    //         city: 'Madrid',
    //         gmt: '+1.0',
    //         country: 'Spain',
    //       },
    //       takeoffDate: '2023-09-22T16:48:00.000Z',
    //       landingDate: '2023-09-22T23:36:00.000Z',
    //       price: {
    //         eur: 470,
    //         usd: 518.457,
    //         rub: 41580.9,
    //         pln: 2157.2999999999997,
    //       },
    //     },
    //     backFlight: {
    //       seats: {
    //         total: 300,
    //         avaible: 294,
    //       },
    //       flightNumber: 'PS-3911',
    //       timeMins: 412,
    //       form: {
    //         key: 'AMS',
    //         name: 'Amsterdam-Schiphol',
    //         city: 'Amsterdam',
    //         gmt: '+1.0',
    //         country: 'Netherlands',
    //       },
    //       to: {
    //         key: 'MAD',
    //         name: 'Barajas',
    //         city: 'Madrid',
    //         gmt: '+1.0',
    //         country: 'Spain',
    //       },
    //       takeoffDate: '2023-09-22T16:48:00.000Z',
    //       landingDate: '2023-09-22T23:36:00.000Z',
    //       price: {
    //         eur: 470,
    //         usd: 518.457,
    //         rub: 41580.9,
    //         pln: 2157.2999999999997,
    //       },
    //     },
    //   },
    //   passengersInfo: {
    //     adult: [
    //       {
    //         firstName: 'Pavel',
    //         lastName: 'arabei',
    //         gender: 'male',
    //         birthdayDate: '2023-05-01T22:00:00.000Z',
    //         invalid: 'true',
    //         baggageBig: 0,
    //         baggageSmall: 0,
    //         seat: '33',
    //       },
    //       {
    //         firstName: 'Anna',
    //         lastName: 'arabei',
    //         gender: 'female',
    //         birthdayDate: '2023-05-01T22:00:00.000Z',
    //         invalid: 'false',
    //         baggageBig: 0,
    //         baggageSmall: 0,
    //         seat: '33',
    //       },
    //     ],
    //     child: [
    //       {
    //         firstName: 'Pavel',
    //         lastName: 'arabei',
    //         gender: 'male',
    //         birthdayDate: '2023-05-01T22:00:00.000Z',
    //         invalid: 'true',
    //         baggageBig: 0,
    //         baggageSmall: 0,
    //         seat: '33',
    //       },
    //     ],
    //     infant: [
    //       {
    //         firstName: 'Pavel',
    //         lastName: 'arabei',
    //         gender: 'male',
    //         birthdayDate: '2023-05-01T22:00:00.000Z',
    //         invalid: 'true',
    //         baggageBig: 0,
    //         baggageSmall: 0,
    //         seat: '33',
    //       },
    //     ],
    //     details: {
    //       countryCode: '+355',
    //       phone: '7777777',
    //       email: 'Pahsdfsdf@gmail.com',
    //     },
    //   },
    //   passengersCount: {
    //     adults: 2,
    //     children: 1,
    //     infants: 1,
    //   },
    //   total: {
    //     adult: {
    //       name: 'adult',
    //       count: 3,
    //       fare: 2820,
    //       tax: 1410,
    //       allPrice: 4230,
    //     },
    //     child: {
    //       name: 'child',
    //       count: 2,
    //       fare: 1316,
    //       tax: 658,
    //       allPrice: 1974,
    //     },
    //     infant: {
    //       name: 'infant',
    //       count: 2,
    //       fare: 376,
    //       tax: 188,
    //       allPrice: 564,
    //     },
    //     totalPrice: 4000,
    //   },
    //   id: 'SomeId2',
    //   isChecked: true,
    // },
  ],
  discont: 0.7,
  totalPrice: 0,
  promoCode: '1111',
};

export const BasketPageReducer = createReducer(
  initialState,
  on(BaskedActions.AddFlight, (state, action) => {
    const isOrderExist = !!state.orders.find((order) => order.id === action.id);
    let newOrders: Order[];
    if (isOrderExist)
      newOrders = [
        ...state.orders.filter((order) => order.id !== action.id),
        action,
      ];
    else newOrders = [...state.orders, action];

    return {
      ...state,
      orders: newOrders,
      totalPrice: totalPrise(newOrders),
    };
  }),
  on(BaskedActions.SortAction, (state, action) => ({
    ...state,
    sortType: action,
  })),
  on(BaskedActions.PromoCode, (state, action) => ({
    ...state,
    totalPrice: promoF(
      action.code,
      state.promoCode,
      state.totalPrice,
      state.discont
    ),
  })),
  on(BaskedActions.DeleteFlight, (state, action) => {
    const newOrders = deleteFlight(state.orders, action.id);
    return {
      ...state,
      orders: newOrders,
      totalPrice: totalPrise(newOrders),
    };
  }),
  on(BaskedActions.Pay, (state) => {
    const newOrders = checkedFlight(state.orders);
    return {
      ...state,
      orders: newOrders,
      totalPrice: totalPrise(newOrders),
    };
  }),
  on(BaskedActions.CheckFlight, (state, action) => {
    const newOrders = checkFlight(state.orders, action.id);
    return {
      ...state,
      orders: newOrders,
      totalPrice: totalPrise(newOrders),
    };
  })
);
