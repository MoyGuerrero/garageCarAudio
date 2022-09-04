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
      icon: '',
      path: 'ventas'
    },
    {
      titulo: 'Productos',
      icon: '',
      path: 'productos'
    }
  ]

  constructor() { }
}
