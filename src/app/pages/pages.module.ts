import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from "@angular/router";

import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { VentasComponent } from './ventas/ventas.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    VentasComponent,
    DashboardComponent,
    PagesComponent
  ],
  exports: [
    VentasComponent,
    DashboardComponent,
    PagesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ]
})
export class PagesModule { }
