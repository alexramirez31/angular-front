import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ProductosComponent } from './productos/productos.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { StockComponent } from './stock/stock.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExtensionesComponent } from './extensiones/extensiones.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { ChartsModule } from 'ng2-charts';




@NgModule({
  declarations: [
    DashboardComponent,
    UsuariosComponent,
    ProductosComponent,
    PagesComponent,
    StockComponent,
    ExtensionesComponent,
    CategoriasComponent,
  ],
  exports: [
    DashboardComponent,
    UsuariosComponent,
    ProductosComponent,
    StockComponent,
    PagesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule
  ]
})
export class PagesModule { }
