import { Component, HostListener } from '@angular/core';
import { UsuariosService } from './services/usuarios.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private usuarioServices: UsuariosService) { }
  @HostListener('window:close') closeNavigator() {
    this.usuarioServices.closedNavigator();
  }
  title = 'garageCarAudio';
}
