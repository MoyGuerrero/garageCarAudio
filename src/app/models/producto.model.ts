import { Precio } from "./precio.model";



export class Producto {
    constructor(
        public id: number,
        public codigo: string,
        public nombre_producto: string,
        public stock: number,
        public talla: number,
        public idprecio: number,
        public activo: boolean,
        public precio: Precio,
        public img?: string,
    ) { }
}