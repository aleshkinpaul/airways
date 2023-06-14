import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AirportsRes, FlightsRes } from '@redux/models/main-page.models';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }),
  };

  constructor(private readonly http: HttpClient) {}

  getAirports() {
    return this.http.get<AirportsRes[]>(
      'https://api.air-ways.online/search/airport',
      this.httpOptions
    );
  }

  searchFlight(
    fromKey: string,
    toKey: string,
    forwardDate: Date,
    backDate: Date | null
  ) {
    const url = 'https://api.air-ways.online/search/flight';
    const body = {
      fromKey: fromKey,
      toKey: toKey,
      forwardDate: forwardDate,
      backDate: backDate,
    };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post<FlightsRes[]>(url, body, httpOptions);
  }
}
