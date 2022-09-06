import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { FormBuilder, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public formSubmitted: boolean = false;

  public regiterLogin = this.fb.group({
    usuario_: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private fb: FormBuilder,
    private usuarioServices: UsuariosService,
    private router: Router) { }


  login() {
    this.formSubmitted = true;

    if (this.regiterLogin.invalid) {
      return;
    }

    this.usuarioServices.login(this.regiterLogin.value).subscribe({
      next: resp => this.router.navigateByUrl('/'),
      error: err => Swal.fire('Error', err.error.msg, 'error')
    });
  }

  campoNoValido(campo: string): boolean {
    if (this.regiterLogin.get(campo)?.invalid && this.formSubmitted) {
      return true
    } else {
      return false
    }
  }

}
