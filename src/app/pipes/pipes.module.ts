import { NgModule } from '@angular/core';
import { ImagenPipe } from './imagen.pipe';
import { PaginadoPipe } from './paginado.pipe';
import { ActivosPipe } from './activos.pipe';



@NgModule({
  declarations: [
    ImagenPipe,
    PaginadoPipe,
    ActivosPipe
  ],
  exports: [
    ImagenPipe,
    PaginadoPipe,
    ActivosPipe
  ]
})
export class PipesModule { }
