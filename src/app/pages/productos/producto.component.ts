import { Component, OnInit } from '@angular/core';
import { Precio } from 'src/app/models/precio.model';
import { ProductosService } from 'src/app/services/productos.service';
import Swal from 'sweetalert2';
import { FormBuilder, Validators } from '@angular/forms';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styles: [
  ]
})
export class ProductoComponent implements OnInit {

  public precios: Precio[] = [];


  public formSubmitted: boolean = false;

  public imagenProductoSubir!: File;

  public id: number = 0;

  public productForm = this.fb.group({
    codigo: ['', Validators.required],
    nombre_producto: ['', Validators.required],
    stock: [1, Validators.required],
    talla: [0, Validators.required],
    idprecio: [0, Validators.required],
  });

  constructor(private productosServices: ProductosService,
    private fb: FormBuilder,
    private fileUploadService: FileUploadService) {
  }

  ngOnInit(): void {
    this.getPrecios();
  }


  getPrecios() {
    this.productosServices.getPrecios().subscribe({
      next: (resp: any) => this.precios = resp.precio,
      error: error => Swal.fire('Error', error.err.msg, 'error')
    });
  }

  Guardar() {

    this.formSubmitted = true;

    if (this.productForm.invalid) {
      return;
    }

    this.productosServices.guardarProducto(this.productForm.value).subscribe({
      next: resp => console.log(resp),
      error: err => Swal.fire('Error', err.error.msg, 'error')
    });
  }

  cambiaImagenProducto(event: any) {
    console.log(event);
    this.imagenProductoSubir = event.target.files[0];

  }

  // subirImagen() {
  //   this.fileUploadService.actualizarFoto(this.imagenProductoSubir, 'producto', this.id).subscribe({
  //     next: resp => console.log(resp),
  //     error: error => Swal.fire('Error', error.error.msg, 'error')
  //   })
  // }

}
