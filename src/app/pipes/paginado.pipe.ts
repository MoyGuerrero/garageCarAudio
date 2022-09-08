import { Pipe, PipeTransform } from '@angular/core';
import { Producto } from '../models/producto.model';

@Pipe({
  name: 'paginado'
})
export class PaginadoPipe implements PipeTransform {

  transform(productos: Producto[], palabraBuscada: string, paginado: number) {
    if (!palabraBuscada) return productos.slice(paginado, paginado + 5);

    return productos.filter((producto: any) => producto.nombre_producto.toLowerCase().includes(palabraBuscada.toLowerCase()) || producto.codigo.toLowerCase().includes(palabraBuscada.toLowerCase()));
  }

}
