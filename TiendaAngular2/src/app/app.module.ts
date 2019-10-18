import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';

import { ListaProductosComponent } from './component/main/lista-productos/lista-productos.component';
import { DetalleProductoComponent } from './component/main/detalle-producto/detalle-producto.component';
import { LoginComponent } from './component/login/login.component';
import { environment } from "../environments/environment";

import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFireAuth } from "@angular/fire/auth";
import { MainComponent } from './component/main/main.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { CarritoComponent } from './component/main/carrito/carrito.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListaProductosComponent,
    DetalleProductoComponent,
    MainComponent,
    NavbarComponent,
    CarritoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule
  ],
  providers: [AngularFireAuth, AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
