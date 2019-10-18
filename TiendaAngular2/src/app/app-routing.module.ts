import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaProductosComponent } from './component/main/lista-productos/lista-productos.component';
import { LoginComponent } from './component/login/login.component';
import { MainComponent } from './component/main/main.component';
import { DetalleProductoComponent } from './component/main/detalle-producto/detalle-producto.component';
import { CarritoComponent } from './component/main/carrito/carrito.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'main', component: MainComponent },
  { path: 'lista', component: ListaProductosComponent, outlet: 'principal' },
  { path: 'detalle/:id', component: DetalleProductoComponent, outlet: 'principal' },
  { path: 'carrito', component: CarritoComponent, outlet: 'principal' },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
