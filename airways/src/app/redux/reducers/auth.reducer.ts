import { AuthState } from '@redux/models/state.models';
import { createReducer, on } from '@ngrx/store';
import { AuthActions } from '@redux/actions/auth.actions';

export const initialState: AuthState = {
  isLogged: false,
  token: null,
  email: null,
  user: null,
  error: null,
  lorInError: null,
  registerError: null,
  meError: null,
};

export const AuthReducer = createReducer(
  initialState,
  on(AuthActions.LoginStart, (state, action) => ({
    ...state,
    email: action.email,
    isLogged: false,
  })),
  on(AuthActions.LoginLoadedSuccess, (state, action) => ({
    ...state,
    token: action.token,
    lorInError: null,
  })),
  on(AuthActions.LoginLoadedError, (state, action) => ({
    ...state,
    lorInError: action.error,
  })),
  on(AuthActions.RegistrationStart, (state, action) => ({
    ...state,
    email: action.email,
    isLogged: false,
  })),
  on(AuthActions.RegistrationLoadedSuccess, (state, action) => ({
    ...state,
    token: action.token,
    registerError: null,
  })),
  on(AuthActions.RegistrationLoadedError, (state, action) => ({
    ...state,
    isLogged: false,
    registerError: action.error,
  })),
  on(AuthActions.meStart, (state) => ({
    ...state,
    isLogged: false,
  })),
  on(AuthActions.meLoadedSuccess, (state, action) => ({
    ...state,
    isLogged: true,
    token: null,
    user: action,
    meError: null,
  })),
  on(AuthActions.meLoadedError, (state, action) => ({
    ...state,
    meError: action.error,
  })),
  on(AuthActions.logOut, (state) => ({
    ...state,
    isLogged: false,
    token: null,
    email: null,
    user: null,
    error: null,
    lorInError: null,
    registerError: null,
    meError: null,
  }))
);
