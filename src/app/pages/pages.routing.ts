import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VentasComponent } from './ventas/ventas.component';
import { ProductosComponent } from './productos/productos.component';
import { ProductoComponent } from './productos/producto.component';



const routes: Routes = [

    {
        path: 'dashboard',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: DashboardComponent, data: { Titulo: '' } },
            { path: 'ventas', component: VentasComponent, data: { Titulo: 'Ventas' } },
            { path: 'productos', component: ProductosComponent, data: { Titulo: 'Productos' } },
            { path: 'producto/:id', component: ProductoComponent, data: { Titulo: 'Agregar Producto' } },
            { path: 'usuario', component: ProductoComponent, data: { Titulo: 'Agregar Producto' } },
            // { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
        ]
    },
    //{ path: 'path/:routeParam', component: MyComponent },
    //{ path: 'staticPath', component: ... },
    //{ path: '**', component: ... },
    //{ path: 'oldPath', redirectTo: '/staticPath' },
    //{ path: ..., component: ..., data: { message: 'Custom' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
