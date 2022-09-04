import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  public usuario!: Usuario;

  constructor(private usuarioServices: UsuariosService) {
    this.usuario = usuarioServices.usuario;
  }

  ngOnInit(): void {
  }


  cerrarSesion() {
    this.usuarioServices.cerrarSesion();
  }

}
