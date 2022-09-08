import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from "@angular/router";

import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { VentasComponent } from './ventas/ventas.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductosComponent } from './productos/productos.component';
import { PipesModule } from '../pipes/pipes.module';
import { ProductoComponent } from './productos/producto.component';



@NgModule({
  declarations: [
    VentasComponent,
    DashboardComponent,
    PagesComponent,
    ProductosComponent,
    ProductoComponent
  ],
  exports: [
    VentasComponent,
    DashboardComponent,
    PagesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule
  ]
})
export class PagesModule { }
