import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any = [
    {
      titulo: 'Dashboard',
      icon: 'mdi mdi-view-dashboard',
      path: '/'
    },
    {
      titulo: 'Ventas',
      icon: 'fas fa-shopping-cart',
      path: 'ventas'
    },
    {
      titulo: 'Productos',
      icon: 'fab fa-product-hunt',
      path: 'productos'
    },
    {
      titulo: 'Usuarios',
      icon: 'fas fa-users',
      path: 'usuario'
    }
  ]

  constructor() { }
}
