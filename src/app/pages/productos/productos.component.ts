import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto.model';
import { ProductosService } from 'src/app/services/productos.service';

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

  constructor(private productoServices: ProductosService) { }



  ngOnInit(): void {
    this.getProductos();
  }

  getProductos() {

    this.cargando = true;

    this.productoServices.getProductos().subscribe({
      next: (resp: any) => {
        this.productos = resp.productos;
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

}
