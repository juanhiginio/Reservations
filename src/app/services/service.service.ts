import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private http = inject(HttpClient);

   private apiUrl = environment.apiUrl;

  constructor() { }

  getAllServices() {
    return this.http.get(`${this.apiUrl}/api/services`);
  }

  getOneService(serviceID: string) {
    return this.http.get(`${this.apiUrl}/api/services/` + serviceID);
  }

}
