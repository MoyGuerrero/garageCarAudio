import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MostrarModalService } from '../../services/mostrar-modal.service';
import { Producto } from '../../models/producto.model';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-modal-producto',
  templateUrl: './modal-producto.component.html',
  styles: [
  ]
})
export class ModalProductoComponent implements OnInit {

  public palabraBuscada: string = '';
  public productos: Producto[] = [];
  public pagina: number = 0;

  @Output() public codigoProducto: EventEmitter<string> = new EventEmitter();

  constructor(public mostrarModalService: MostrarModalService,
    private productoServices: ProductosService) { }

  ngOnInit(): void {
    this.getProductos();
  }

  getProductos() {

    this.productoServices.getProductos().subscribe({
      next: (resp: any) => {
        this.productos = resp.producto;
      }
    })
  }

  cerrarmodal() {
    this.mostrarModalService.cerrarModal();
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

  productoSeleccionado(codigo: string) {
    this.codigoProducto.emit(codigo);
    this.mostrarModalService.cerrarModal();

  }
}
