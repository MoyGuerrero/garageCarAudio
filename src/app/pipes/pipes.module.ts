import { NgModule } from '@angular/core';
import { ImagenPipe } from './imagen.pipe';
import { PaginadoPipe } from './paginado.pipe';



@NgModule({
  declarations: [
    ImagenPipe,
    PaginadoPipe
  ],
  exports: [
    ImagenPipe,
    PaginadoPipe
  ]
})
export class PipesModule { }
