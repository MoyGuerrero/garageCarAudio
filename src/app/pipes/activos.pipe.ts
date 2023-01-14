import { Pipe, PipeTransform } from '@angular/core';
import { Usuario } from '../models/usuario.model';

@Pipe({
  name: 'activos'
})
export class ActivosPipe implements PipeTransform {

  transform(usuario: Usuario[], palabraBuscada: string) {

    console.log(usuario.filter(user => user.activo == true));
    return usuario.filter(user => user.nombre.toLowerCase().includes(palabraBuscada.toLowerCase()) || user.apellidos.toLowerCase().includes(palabraBuscada.toLowerCase()));
  }

}
