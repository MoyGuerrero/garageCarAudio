import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Producto } from '../models/producto.model';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  public producto!: Producto;

  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  buscarProducto(codigo: string) {
    return this.http.get(`${base_url}/producto/${codigo}`, this.headers).pipe(
      map((resp: any) => {
        const { id, codigo, nombre_producto, stock, talla, img, idprecio, activo, precio } = resp.producto;
        this.producto = new Producto(id, codigo, nombre_producto, stock, talla, idprecio, activo, precio, img)
        const producto = new Producto(id, codigo, nombre_producto, stock, talla, idprecio, activo, precio, img);
        return {
          producto
        }
      })
    )
  }

  guardarProducto(producto: Producto) {
    console.log(producto);
    return this.http.post(`${base_url}/producto/agregar_producto`, producto, this.headers)
  }

  getProductos() {
    return this.http.get(`${base_url}/producto/`, this.headers);
  }

  getProductoEditar(id: number) {
    return this.http.get(`${base_url}/producto/editar/${id}`, this.headers);
  }

  editarProductos(producto: any, id: number) {
    return this.http.post(`${base_url}/producto/editar/producto/${id}`, producto, this.headers);
  }

  changeStatusProduct(status: boolean, id: number) {
    return this.http.post(`${base_url}/producto/estatus/${id}`, { activo: status }, this.headers)
  }



  /**
   * Se agrega aqui los http para obtener los precios para no crear otros servicio
   */
  getPrecios() {
    return this.http.get(`${base_url}/precios/`, this.headers)
  }

  postPrecio(precio: number) {
    return this.http.post(`${base_url}/precios/nuevo_precio`, { precio }, this.headers)
  }


  // cobrarVenta(productos: any[], importe: number, idusuario: number) {
  //   return this.http.post(`${base_url}/venta/agregar-venta`, { producto: productos, importe: importe, idusuario: idusuario }, this.headers);
  // }
}
