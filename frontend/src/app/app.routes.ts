import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { InventarioComponent } from './components/inventario/inventario';
import { MovimientosComponent } from './components/movimientos/movimientos';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'inventario', component: InventarioComponent, canActivate: [authGuard] },
  { path: 'movimientos', component: MovimientosComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: 'login' }
];