export class Usuario {
    constructor(
        public id: number,
        public nombre: string,
        public apellidos: string,
        public usuario_: string,
        public password: string,
        public activo: boolean,
        public rol_idrol: number,
        public direccion?: string,
        public telefono?: string,
    ) { }


    get nombreCompleto() {
        return this.nombre + ' ' + this.apellidos
    }
}