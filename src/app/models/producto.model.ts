import { Precio } from "./precio.model";



export class Producto {
    constructor(
        public id: number,
        public codigo: string,
        public nombre: string,
        public stock: number,
        public talla: number,
        public idprecio: number,
        public activo: boolean,
        public precios: Precio,
        public img?: string,
    ) { }
}