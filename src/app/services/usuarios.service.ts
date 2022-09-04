import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interfaces';
import { tap, map, catchError } from "rxjs/operators";
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  public usuario!: Usuario;

  constructor(private http: HttpClient,
    private router: Router) { }

  validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';

    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap((resp: any) => {

        this.usuario = new Usuario(resp.usuario.id, resp.usuario.nombre, resp.usuario.apellidos, resp.usuario.usuario_, resp.usuario.password, resp.usuario.activo, resp.usuario.rol_idrol, resp.usuario.direccion, resp.usuario.telefono);
        localStorage.setItem('token', resp.token);
      }),
      map(resp => true),
      catchError(error => of(false))
    );
  }

  login(loginData: LoginForm) {
    return this.http.post(`${base_url}/login/acceder`, loginData)
      .pipe(
        tap((resp: any) => localStorage.setItem('token', resp.token))
      );
  }

  cerrarSesion() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }
}
