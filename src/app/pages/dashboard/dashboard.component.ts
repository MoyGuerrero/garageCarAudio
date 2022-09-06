import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Ventas } from 'src/app/models/ventas.model';
import { VentasService } from '../../services/ventas.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {

  public today = new Date();
  public pipe = new DatePipe('en-US');
  public ChangedFormat = this.pipe.transform(this.today, 'YYYY-MM-dd');
  public startDate = '2022-01-01';
  public mostrarVentas: Ventas[] = [];


  public buscarVenta = this.fb.group({
    inicio: [this.startDate, Validators.required],
    fin: [this.ChangedFormat, Validators.required]
  });

  constructor(private fb: FormBuilder, private ventasServices: VentasService) { }

  ngOnInit(): void {
  }

  buscarDatos() {

    const { inicio, fin } = this.buscarVenta.value;
    let fechas = {
      inicio: inicio + ' 00:00:00',
      fin: fin + ' 00:00:00'
    }

    this.ventasServices.buscar_venta(fechas).subscribe({
      next: (res: any) => {
        this.mostrarVentas = res.venta;
      }
    });
  }

}
