import { AfterViewInit, Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';
import { ProductosService } from '../../services/productos.service';
import { VentasService } from '../../services/ventas.service';


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
  public idusuario!: number;

  public mostrarProducto: mostrarProductos[] = [];


  constructor(private ventasService: VentasService,
    private usuarioServices: UsuariosService,
    private productoServices: ProductosService
  ) { }


  ngOnInit(): void {
    this.idusuario = this.usuarioServices.usuario.id;
  }


  onKeyUp(evento: any) {
    if (evento.target.value.trim() === '') {
      Swal.fire('Error', 'No se puede buscar con un campo vacio', 'error');
      return;
    }
    const codigo = evento.target.value;
    this.productoServices.buscarProducto(codigo).subscribe({
      next: res => {

        const { id, codigo, nombre_producto, stock, talla, img, idprecio, activo, precio } = res.producto;
        if (this.mostrarProducto.length === 0) {
          let datos = { id: 0, codigo: '', nombre: '', cantidad: 0, precio: 0 }
          datos.id = id;
          datos.codigo = codigo;
          datos.nombre = nombre_producto;
          datos.cantidad = 1;
          datos.precio = precio.precio;
          this.total = precio.precio;
          this.mostrarProducto.push(datos);
        } else {
          const existeProducto = this.mostrarProducto.find((producto: any) => (producto.codigo === codigo) ? true : false);
          if (existeProducto != undefined) {
            existeProducto.cantidad += 1;

            this.total = this.total + existeProducto.precio;
          } else {
            let datos = { id: 0, codigo: '', nombre: '', cantidad: 0, precio: 0 }
            datos.id = id;
            datos.codigo = codigo;
            datos.nombre = nombre_producto;
            datos.cantidad = 1;
            datos.precio = precio.precio;
            this.total += precio.precio;
            this.mostrarProducto.push(datos);
          }
        }
      },
      error: err => Swal.fire('Error', err.error.msg, 'error')
    });
    this.codigo = '';
  }

  cobrarVenta() {
    if (this.mostrarProducto.length === 0) return;
    if (this.total > this.cambio) {
      Swal.fire('Advertencia', 'No se acompleta para el pago', 'warning');
      return;
    }
    this.ventasService.cobrarVenta(this.mostrarProducto, this.cambio, this.idusuario).subscribe({
      next: (resp: any) => {
        Swal.fire({
          title: '¿Desea mprimir el ticket?',
          text: `Cambio ${resp.cambio}`,
          icon: 'success',
          showCancelButton: true,
          confirmButtonText: 'Imprimir',
          cancelButtonText: 'No imprimir'
        }).then((result) => {
          if (result.isConfirmed) {
            this.mostrarProducto = [];
            this.total = 0;
            this.cambio = 0;
          } else {
            this.mostrarProducto = [];
            this.total = 0;
            this.cambio = 0;
          }
        })
      },
      error: err => Swal.fire('Error', err.error.msg, 'error')
    });

  }
}
