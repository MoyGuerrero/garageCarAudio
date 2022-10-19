import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Ventas } from 'src/app/models/ventas.model';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { VentasService } from '../../services/ventas.service';
const base_url = environment.base_url;


// import DataLabelsPlugin from 'chartjs-plugin-datalabels';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {
  
  public today = new Date();
  public pipe = new DatePipe('en-US');
  public url: string = ''
  public nameFile: string = ''
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

  descargarTicket(ticket: Ventas) {
    if (ticket.nombre_tickets === null) {
      return;
    }    // console.log(ticket)

    window.open(`${base_url}/venta/descargar/${ticket.nombre_tickets}`, '_blank')
    // this.ventasServices.descargar(ticket.nombre_tickets!).subscribe({
    //   next: (resp: any) => {
    //     this.downloadFile(resp.resultado);
    //   },
    //   error: err => Swal.fire('Error', err.error.msg, 'error')
    // });
  }

  downloadFile(data: any) {

    const binaryData = [];
    binaryData.push(data)

    var url = window.URL.createObjectURL(new Blob(binaryData, { type: 'pdf' }));
    const d = document.getElementById('descargarPDF') as HTMLAnchorElement | null;

    if (d != null) {

      d.href = url;
    }


    d?.setAttribute('href', url);
    window.open(url);
  }
}
