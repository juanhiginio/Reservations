import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http = inject(HttpClient);

  private apiUrl = environment.apiUrl;

  constructor() {}

  register(formData: any) {
    return this.http.post(`${this.apiUrl}/api/users`, 
    formData
  );
  }

  login(formData: any) {
    return this.http.post(`${this.apiUrl}/api/token`, {
      email: formData.email,
      password: formData.password,
    });
  }

}
