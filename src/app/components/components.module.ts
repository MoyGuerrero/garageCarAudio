import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalProductoComponent } from './modal-producto/modal-producto.component';
import { FormsModule } from '@angular/forms';
import { PipesModule } from '../pipes/pipes.module';



@NgModule({
  declarations: [
    ModalProductoComponent
  ],
  exports: [
    ModalProductoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PipesModule
  ]
})
export class ComponentsModule { }
