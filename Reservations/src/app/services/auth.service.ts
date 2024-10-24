import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  nombreUsuario = signal("");

  setToken(response: any) {
    localStorage.setItem("user_token", response);
    this.nombreUsuario.set(response.name);
    return;
  }

  removeToken() {
    localStorage.removeItem("user_token");
    return;
  }

}
