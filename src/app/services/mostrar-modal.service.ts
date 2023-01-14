import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MostrarModalService {


  private _ocultarModal: boolean = true;

  private _codigo: string = '';


  get ocultarModal() {
    return this._ocultarModal;
  }
  get obtenerProductoVenta() {
    return this._codigo;
  }


  abrirModal() {
    this._ocultarModal = false;
  }

  cerrarModal() {
    this._ocultarModal = true;
  }

  obtenerProducto(codigo: string) {
    console.log(codigo);
    this._codigo = codigo;
  }

  constructor() { }
}
