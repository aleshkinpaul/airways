import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import passwordValidator from '@booking/validators/password-validator';
import { Errors, LogInForm, SingInForm } from '@core/models/auth.models';
import { facebook, google } from '@core/svg/SVG';
import { IconService } from '@core/services/icon.service';
import nameValidator from '@booking/validators/name-validator';
import phoneValidator from '@booking/validators/phone-validator';
import { Store } from '@ngrx/store';
import { AuthSelectors } from '@redux/selectors/auth.selectors';
import { Subscription } from 'rxjs';
import { AuthActions } from '@redux/actions/auth.actions';
import { LoginUser, RegisterUser } from '@redux/models/auth.models';

const ICONS: { name: string; source: string }[] = [
  {
    name: 'facebook',
    source: facebook,
  },
  {
    name: 'google',
    source: google,
  },
];

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit, OnDestroy {
  public logInForm!: FormGroup<LogInForm>;
  public singInForm!: FormGroup<SingInForm>;
  public logIn = true;

  public errors: Errors = {
    loginError: null,
    registerError: null,
    meError: null,
  };

  private token$ = this.store.select(AuthSelectors.AuthTokenSelector);
  private loginError$ = this.store.select(AuthSelectors.LogInError);
  private registerError$ = this.store.select(AuthSelectors.RegisterError);
  private MeError$ = this.store.select(AuthSelectors.RegisterError);

  private subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private iconService: IconService,
    private store: Store
  ) {
    this.addPathToIcon();
    this.addErrors();
    this.addToken();
  }

  ngOnInit(): void {
    this.createForms();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  public submitLogInForm() {
    if (this.logInForm.valid) {
      const userLogIn = this.logInForm.value as LoginUser;
      this.store.dispatch(AuthActions.LoginStart(userLogIn));
    }
  }

  public submitSingInForm() {
    if (this.singInForm.valid) {
      const formWithOutCheck = { ...this.singInForm.value };
      delete formWithOutCheck.privacyPolicy;
      const userSingIn = { ...formWithOutCheck } as RegisterUser;
      this.store.dispatch(AuthActions.RegistrationStart(userSingIn));
    }
  }

  private addPathToIcon() {
    for (const icon of ICONS) {
      this.iconService.add(icon.name, icon.source);
    }
  }

  private createForms() {
    this.logInForm = this.fb.group<LogInForm>({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, passwordValidator()]),
    });

    this.singInForm = this.fb.group<SingInForm>({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, passwordValidator()]),
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10),
        nameValidator(),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10),
        nameValidator(),
      ]),
      gender: new FormControl('', [Validators.required]),
      dateOfBirth: new FormControl('', [Validators.required]),
      countryCode: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required, phoneValidator()]),
      citizenship: new FormControl('', [Validators.required]),
      privacyPolicy: new FormControl('', [Validators.required]),
    });
  }

  private addErrors() {
    const loginErrorSub = this.loginError$.subscribe((error) => {
      this.errors.loginError = error;
    });
    const registerErrorSub = this.registerError$.subscribe((error) => {
      this.errors.registerError = error;
    });
    const MeErrorSub = this.MeError$.subscribe((error) => {
      this.errors.meError = error;
    });

    [loginErrorSub, registerErrorSub, MeErrorSub].forEach((sub) =>
      this.subscriptions.push(sub)
    );
  }

  private addToken() {
    const tokenSub = this.token$.subscribe((token) => {
      if (token) this.store.dispatch(AuthActions.meStart({ token }));
    });
    this.subscriptions.push(tokenSub);
  }
}
