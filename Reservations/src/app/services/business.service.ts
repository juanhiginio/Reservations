import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  private http = inject(HttpClient)
  private apiUrl = environment.apiUrl;

  constructor() { }

  businessList(category?: string) {

    let endpoint = `${this.apiUrl}/api/business`;
    if (category) {
      endpoint+="?category=" + category;
    }

    return this.http.get(endpoint);
  }

  getAllBusiness() {
    return this.http.get(`${this.apiUrl}/api/business`);
  }
  
  getOneBusiness(businessId: string) {
    return this.http.get(`${this.apiUrl}/api/business/` + businessId, );
  }

  create(newBusiness: any) {
    return this.http.post(
      `${this.apiUrl}/api/business`,
      newBusiness,
      {
        headers: new HttpHeaders({
          'Content-type': 'application/json',
        }),
      },
    );
  }

}
