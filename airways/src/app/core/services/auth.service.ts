import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  LoginUser,
  RegisterUser,
  Token,
  UserRes,
} from '@redux/models/auth.models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private BASE_URL = 'https://api.air-ways.online/auth/';
  private ME_URL = 'me';
  private LOGIN_URL = 'login';
  private REGISTER_URL = 'registration';

  constructor(private http: HttpClient) {}

  public getUserData(token: string) {
    const url = `${this.BASE_URL}${this.ME_URL}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<UserRes>(url, { headers });
  }

  public getLogInToken(userData: LoginUser): Observable<Token> {
    const url = `${this.BASE_URL}${this.LOGIN_URL}`;
    return this.http.post<Token>(url, userData);
  }

  public getRegistrationToken(userData: RegisterUser): Observable<Token> {
    const url = `${this.BASE_URL}${this.REGISTER_URL}`;
    return this.http.post<Token>(url, userData);
  }
}
