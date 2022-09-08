import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string) {

    if (img === '' || img == null) {
      return `${base_url}/uploads/producto/1`;
    } else {
      return `${base_url}/uploads/producto/${img}`;
    }
  }

}
