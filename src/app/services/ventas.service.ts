import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Ventas } from '../models/ventas.model';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class VentasService {
  public venta!: Ventas;
  constructor(private http: HttpClient) { }


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


  buscar_venta(fechas: any) {
    return this.http.post(`${base_url}/venta/buscar-venta`, fechas, this.headers).pipe(
      map((res: any) => {
        let resultado: any = [];
        let grafica: any = [];
        res.venta.reduce((res: any, value: any) => {
          let mes = new Date(value.fecha).getMonth();
          if (!res[mes]) {
            res[mes] = { Mes: mes };

            // Inicializamos a 0 el valor de cada key
            Object.keys(value).forEach(function (key) {
              if (key != 'fecha') {
                res[mes][key] = 0;
              }
            })

            resultado.push(res[mes])
          }

          // Sumamos el valor de cada clave dentro de un bucle
          Object.keys(value).forEach(function (key) {
            if (key != 'fecha') {
              res[mes][key] += value[key];
            }
          })

          return res;

        }, {});
        for (let i = 0; i < resultado.length; i++) {

          let infoGrafica = {
            mes: resultado[i].Mes,
            total: resultado[i].total
          }

          grafica.push(infoGrafica);
        }

        return {
          venta: res.venta,
          grafica
        };
      })
    );
  }
}
