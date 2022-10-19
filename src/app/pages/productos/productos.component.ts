import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto.model';
import { ProductosService } from 'src/app/services/productos.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styles: [
  ]
})
export class ProductosComponent implements OnInit {

  public cargando: boolean = true;
  public ocultarBotones: boolean = false;

  public productos: Producto[] = [];

  public palabraBuscada: string = '';
  public pagina: number = 0;

  constructor(private productoServices: ProductosService,
    private router: Router) { }



  ngOnInit(): void {
    this.getProductos();
  }

  getProductos() {

    this.cargando = true;

    this.productoServices.getProductos().subscribe({
      next: (resp: any) => {
        this.productos = resp.producto;
        this.cargando = false;
      }
    })
  }


  ocultarBoton(): boolean {

    if (this.palabraBuscada == '') {
      return true;
    } else {
      return false;
    }
  }


  nextPage() {
    this.pagina += 5;
  }

  prevPage() {
    if (this.pagina > 0) {
      this.pagina -= 5;
    }
  }

  changeStatusProduct(value: boolean, id: number) {
    if (value == false) {
      this.productoServices.changeStatusProduct(true, id).subscribe({
        next: (resp: any) => {
          Swal.fire('Exito', resp.msg, 'success');
          this.getProductos();
        },
        error: err => Swal.fire('Error', err.error.msg, 'error')
      })
    } else {
      this.productoServices.changeStatusProduct(false, id).subscribe({
        next: (resp: any) => {
          Swal.fire('Exito', resp.msg, 'success');
          this.getProductos();
        },
        error: err => Swal.fire('Error', err.error.msg, 'error')
      })
    }
  }



}
