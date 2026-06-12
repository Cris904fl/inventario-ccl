import { Component, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductosService } from '../../services/productos';

@Component({
  selector: 'app-movimientos',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './movimientos.html',
  styleUrl: './movimientos.css'
})
export class MovimientosComponent {

  productoId: number = 1;
  tipo: string = 'entrada';
  cantidad: number = 1;
  mensaje = '';
  error = '';
  enviando = false;

  constructor(
    private productosService: ProductosService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  registrar() {
    this.mensaje = '';
    this.error = '';

    const id = Number(this.productoId);
    const cant = Number(this.cantidad);

    if (!id || !cant || cant <= 0) {
      this.error = 'Completa todos los campos correctamente';
      return;
    }

    this.enviando = true;

    this.productosService.registrarMovimiento(id, this.tipo, cant).subscribe({
      next: (res: any) => {
        this.mensaje = `✅ Movimiento registrado. Stock actual: ${res.stockActual}`;
        this.enviando = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = err.error?.mensaje || 'Ocurrió un error al registrar';
        this.enviando = false;
        this.cdr.detectChanges();
      }
    });
  }

  volver() {
    this.router.navigate(['/inventario']);
  }
}