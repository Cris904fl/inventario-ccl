import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {

  usuario = '';
  password = '';
  error = '';
  cargando = false;

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    if (!this.usuario || !this.password) {
      this.error = 'Por favor completa todos los campos';
      return;
    }

    this.error = '';
    this.cargando = true;

    this.auth.login(this.usuario, this.password).subscribe({
      next: (res) => {
        this.auth.guardarToken(res.token);
        this.router.navigate(['/inventario']);
      },
      error: () => {
        this.error = 'Usuario o contraseña incorrectos';
        this.cargando = false;
      }
    });
  }
}