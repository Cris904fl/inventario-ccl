import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {

  // TODO: mover esto a environment cuando se tenga el ambiente de prod
  private api = 'http://localhost:5148/auth';

  constructor(private http: HttpClient, private router: Router) {}

  login(usuario: string, password: string) {
    return this.http.post<{ token: string }>(`${this.api}/login`, { usuario, password });
  }

  guardarToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return !!this.getToken();
  }

  cerrarSesion() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  // alias para no romper los componentes que usan logout
  logout() {
    this.cerrarSesion();
  }
}