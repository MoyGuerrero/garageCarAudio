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
        const producto = new Producto(id, codigo, nombre_producto, stock, talla, idprecio, activo, precio, img);
        return {
          producto
        }
      })
    )
  }

  cobrarVenta(productos: any[], importe: number, idusuario: number) {
    return this.http.post(`${base_url}/venta/agregar-venta`, { producto: productos, importe: importe, idusuario: idusuario }, this.headers);
  }
}
