import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ProductosComponent } from './productos/productos.component';
import { StockComponent } from './stock/stock.component';
import { AuthGuard } from '../guards/auth.guard';
import { ExtensionesComponent } from './extensiones/extensiones.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
  {
    path: 'dashboard', component: PagesComponent,canActivate:[AuthGuard],
    children: [
      { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' } },
      { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' } },
      { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Usuarios' } },
      { path: 'extensiones', component: ExtensionesComponent, data: { titulo: 'Extensiones' } },
      { path: 'categorias', component: CategoriasComponent, data: { titulo: 'Categorias' } },
      { path: 'productos', component: ProductosComponent, data: { titulo: 'Productos' } },
      { path: 'stock', component: StockComponent, data: { titulo: 'Stock' }},
      { path: '**', component: ErrorComponent  },
    ]},
    
  
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
