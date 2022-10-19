import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {

  public titulo: string = '';

  public tituloSub$: Subscription = new Subscription;

  constructor(private router: Router) {
    this.tituloSub$ = this.getTituloRutaBreadcrumbs().subscribe(({ Titulo }) => {
      this.titulo = Titulo;
    })
  }
  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    this.tituloSub$.unsubscribe();
  }





  getTituloRutaBreadcrumbs() {
    return this.router.events.pipe(
      filter((event: any) => event instanceof ActivationEnd),
      filter((event: ActivationEnd) => event.snapshot.firstChild == null),
      map((event: ActivationEnd) => event.snapshot.data)
    )
  }

}
