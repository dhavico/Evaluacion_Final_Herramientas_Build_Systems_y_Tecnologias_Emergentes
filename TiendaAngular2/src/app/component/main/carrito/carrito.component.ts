import { Component, OnInit } from '@angular/core';
import { DataApiService } from 'src/app/service/data-api.service';
import { CarritoInterface } from 'src/app/model/CarritoInterface';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  constructor(private dataApi: DataApiService) { }

  public carrito: CarritoInterface[] = [];
  public totalPagar: number = 0;

  ngOnInit() {
    this.carrito = this.dataApi.getCarrito();
    this.carrito.map(producto => {
      this.totalPagar += producto.subtotal;
    })
  }

  pagarCarrito(){
    this.carrito.map(producto => {

      this.dataApi.updateStock(producto.id, producto.cantidad).then(value => console.log("asdsadasdasd",value));
    });
    this.dataApi.payCarrito();
  }

}
