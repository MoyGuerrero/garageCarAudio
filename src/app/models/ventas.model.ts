import { Usuario } from './usuario.model';


export class Ventas {
    constructor(
        public id: number,
        public total: number,
        public fecha: string,
        public idusuario: number,
        public usuario: Usuario,
        public nombre_tickets?: string
    ) { }
}