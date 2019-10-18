import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DataApiService } from 'src/app/service/data-api.service';
import { ProductoInterface } from 'src/app/model/ProductoInterface';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css']
})
export class DetalleProductoComponent implements OnInit {
  
  constructor(
    private route: ActivatedRoute,
    private dataApi: DataApiService
  ) { }
  public producto = {};

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    this.getDetalleProducto(id);
  }

  getDetalleProducto(idProducto: string){
    this.dataApi.getOneProducto(idProducto).subscribe( producto => {
      console.dir(producto);
      this.producto = producto;
    });
  }

}
