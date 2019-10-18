import { Component, OnInit } from '@angular/core';
import { DataApiService } from 'src/app/service/data-api.service';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CarritoInterface } from 'src/app/model/CarritoInterface';
import { ProductoInterface } from 'src/app/model/ProductoInterface';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent implements OnInit {

  constructor(private dataApi: DataApiService, public authService: AuthService, public router: Router) { }
  public productos = [];
  public productosfilter = [];
  public producto = '';

  ngOnInit() {
    this.dataApi.getAllProductos().subscribe(productos => {
      console.log('Productos', productos)
      this.productos = productos;
      this.productosfilter = productos;
    })
  }

  filtro(textoBusqueda: string){
      this.productos = this.productosfilter;
      const filterValue = textoBusqueda.toLowerCase();
      let filtro = this.productos.filter(option => option.nombre.toLowerCase().indexOf(filterValue)!=-1);
      this.productos = filtro;
  }

  addCarrito(producto: ProductoInterface, cantidad){
    let carritoProducto = {
      id: producto.id,
      imagenUrl: producto.imagenUrl,
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad: parseInt(cantidad),
      subtotal: parseInt(cantidad) * producto.precio
    };
    this.dataApi.addCarrito(carritoProducto);
  }
}
