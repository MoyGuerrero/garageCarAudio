import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {

  public cargando: boolean = true;
  public palabraBuscada: string = '';

  public pagina: number = 0;
  public usuario: Usuario[] = [];

  constructor(private usuariosService: UsuariosService) { }

  ngOnInit(): void {
    this.getUsuarios();
  }

  getUsuarios() {
    this.usuariosService.getUsuarios().subscribe({
      next: (resp: any) => {
        this.usuario = resp.usuario;
        console.log(this.usuario);
        this.cargando = false;
      },
      error: err => console.log(err.err.msg)
    });
  }

}
