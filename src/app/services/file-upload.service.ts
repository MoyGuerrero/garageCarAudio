import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  constructor(private http: HttpClient) { }


  actualizarFoto(archivo: File, tipo: 'producto', id: string | number) {
    const data = new FormData();
    data.append('imagen', archivo)
    return this.http.put(`${base_url}/upload/${tipo}/${id}`, data, this.headers);
  }
}
