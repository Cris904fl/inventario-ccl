import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth';

@Injectable({ providedIn: 'root' })
export class ProductosService {

  private api = 'http://localhost:5148/productos';

  constructor(private http: HttpClient, private auth: AuthService) {}

  private headers() {
    return new HttpHeaders({ Authorization: `Bearer ${this.auth.getToken()}` });
  }

  registrarMovimiento(productoId: number, tipo: string, cantidad: number) {
    const body = { productoId, tipo, cantidad };
    return this.http.post(`${this.api}/movimiento`, body, { headers: this.headers() });
  }

  getInventario() {
    return this.http.get<any[]>(`${this.api}/inventario`, { headers: this.headers() });
  }
}