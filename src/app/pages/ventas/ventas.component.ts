import { AfterViewInit, Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ProductosService } from '../../services/productos.service';


interface mostrarProductos {
  id: number,
  codigo: string,
  nombre: string
  cantidad: number,
  precio: number
}
@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styles: [
  ]
})
export class VentasComponent implements OnInit {

  public codigo: string = '';
  public total: number = 0;
  public cambio: number = 0;

  public mostrarProducto: mostrarProductos[] = [];


  constructor(private productoServices: ProductosService) { }


  ngOnInit(): void {
  }


  onKeyUp(evento: any) {
    if (evento.target.value.trim() === '') {
      Swal.fire('Error', 'No se puede buscar con un campo vacio', 'error');
      return;
    }
    const codigo = evento.target.value;
    this.productoServices.buscarProducto(codigo).subscribe({
      next: res => {

        const { id, codigo, nombre, stock, talla, img, idprecio, activo, precios } = res.producto;
        if (this.mostrarProducto.length === 0) {
          let datos = { id: 0, codigo: '', nombre: '', cantidad: 0, precio: 0 }
          datos.id = id;
          datos.codigo = codigo;
          datos.nombre = nombre;
          datos.cantidad = 1;
          datos.precio = precios.precio;
          this.total = precios.precio;
          this.mostrarProducto.push(datos);
        } else {
          const existeProducto = this.mostrarProducto.find((producto: any) => (producto.codigo === codigo) ? true : false);
          if (existeProducto != undefined) {
            existeProducto.cantidad += 1;

            console.log(existeProducto.precio);
            this.total = this.total + existeProducto.precio;
          } else {
            let datos = { id: 0, codigo: '', nombre: '', cantidad: 0, precio: 0 }
            datos.id = id;
            datos.codigo = codigo;
            datos.nombre = nombre;
            datos.cantidad = 1;
            datos.precio = precios.precio;
            this.total += precios.precio;
            this.mostrarProducto.push(datos);
          }
        }
      }
    });
    this.codigo = '';
  }

  cobrarVenta() {
    this.productoServices.cobrarVenta(this.mostrarProducto);
    this.mostrarProducto = [];
    this.total = 0;
  }
}
