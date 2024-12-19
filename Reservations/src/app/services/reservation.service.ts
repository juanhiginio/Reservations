import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor() { }

  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getAllReservations() {
    return this.http.get(`${this.apiUrl}/api/reservation`, {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('user_token')}`
      })
    });
  }

  getOneReservation(reservationID: string) {
    return this.http.get(`${this.apiUrl}/api/reservation/` + reservationID);
  }

  create(newReservation: any) {
    return this.http.post(
      `${this.apiUrl}/api/reservation`,
      newReservation,
      {
        headers: new HttpHeaders({
          'Content-type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('user_token')}`
        }),
      },
    );
  }
}
