import { Component, OnInit } from '@angular/core';
import { Precio } from 'src/app/models/precio.model';
import { ProductosService } from 'src/app/services/productos.service';
import Swal from 'sweetalert2';
import { FormBuilder, Validators } from '@angular/forms';
import { FileUploadService } from '../../services/file-upload.service';
import { ActivatedRoute, Router } from '@angular/router';

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

  public estaOculto: boolean = false;

  public imagen: string = ''

  public id: number = 0;

  public imgTemp: any = null;

  public productForm = this.fb.group({
    codigo: ['', Validators.required],
    nombre_producto: ['', Validators.required],
    stock: [1, Validators.required],
    talla: [0, Validators.required],
    idprecio: [0, Validators.required],
  });

  constructor(private productosServices: ProductosService,
    private fb: FormBuilder,
    private fileUploadService: FileUploadService,
    private activedRoute: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit(): void {
    this.getPrecios();

    this.activedRoute.params.subscribe(({ id }) => {
      if (id != 'nuevo') {
        this.id = id;
        this.estaOculto = true;
        this.buscarProductoEditar(id);
      } else {
        this.estaOculto = false;
      }
    })
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

    if (this.productForm.get('talla')?.value == 0) {
      Swal.fire('Error', 'Por favor no se puede dejar el campo seleccionado');
      return;
    }
    if (this.productForm.get('idprecio')?.value == 0) {
      Swal.fire('Error', 'Por favor no se puede dejar el campo seleccionado');
      return;
    }

    if (!this.estaOculto) {
      this.productosServices.guardarProducto(this.productForm.value).subscribe({
        next: (resp: any) => {
          Swal.fire('Exito', resp.msg, 'success')
          this.router.navigateByUrl('/dashboard/producto/' + resp.productoNuevo.id);
        },
        error: err => Swal.fire('Error', err.error.msg, 'error')
      });
    } else {
      this.productosServices.editarProductos(this.productForm.value, this.id).subscribe({
        next: (resp: any) => {
          console.log(resp);
          Swal.fire('Exito', resp.msg, 'success');
          // this.router.navigateByUrl('/dashboard/productos');
        },
        error: err => console.log(err.error.msg)
      });
    }



  }

  cambiaImagenProducto(event: any) {

    this.imagenProductoSubir = event.target.files[0];
    if (!event.target.files[0]) {
      this.imgTemp = null;
      return;
    }

    const reader = new FileReader();

    reader.readAsDataURL(event.target.files[0]);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
  }

  abrirFile() {
    document.getElementById('theFile')?.click();
  }

  subirImagen() {
    this.fileUploadService.actualizarFoto(this.imagenProductoSubir, 'producto', this.id).subscribe({
      next: resp =>
        this.router.navigateByUrl('/dashboard/productos'),
      error: error => Swal.fire('Error', error.error.msg, 'error')
    })
  }

  buscarProductoEditar(id: number) {
    this.productosServices.getProductoEditar(id).subscribe({
      next: (resp: any) => {
        console.log(resp);
        const { codigo, nombre_producto, stock, talla, idprecio, img } = resp.producto
        this.imagen = img;
        this.productForm.setValue({
          codigo,
          nombre_producto,
          stock,
          talla,
          idprecio
        })
      },
      error: err => Swal.fire('Error', err.error.msg, 'error')
    });
  }


  async abrirSweetAlert() {
    const { value = 0 } = await Swal.fire<number>({
      title: 'Crear precio',
      text: 'Ingrese el nuevo precio',
      input: 'text',
      inputPlaceholder: 'Nuevo Precio',
      showCancelButton: true,
      allowOutsideClick: false,
      confirmButtonText: 'Guardar precio',
      cancelButtonText: 'Cancelar'
    })
    if (value > 0) {
      this.productosServices.postPrecio(value).subscribe({
        next: (resp: any) => {
          Swal.fire('Exito', resp.msg, 'success');
          this.getPrecios();
        },
        error: err => Swal.fire('Exito', err.error.msg, 'success')
      });
    }
  }

}
