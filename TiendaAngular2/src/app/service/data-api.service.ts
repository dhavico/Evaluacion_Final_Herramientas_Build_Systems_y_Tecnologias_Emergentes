import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument  } from "@angular/fire/firestore";
import { ProductoInterface } from '../model/ProductoInterface';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { AuthService } from './auth.service';
import { CarritoInterface } from '../model/CarritoInterface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  constructor(private afs: AngularFirestore, private authService: AuthService, private route: Router) { 
    this.productosCollection = afs.collection<ProductoInterface>('productos');
    this.productos = this.productosCollection.valueChanges();
  }
  private productosCollection: AngularFirestoreCollection<ProductoInterface>;
  private productos: Observable<ProductoInterface[]>;
  private productoDoc: AngularFirestoreDocument<ProductoInterface>;
  private producto: Observable<ProductoInterface>;

  getAllProductos(){
    return this.productos = this.productosCollection.snapshotChanges()
    .pipe(map( changes => {
      return changes.map( action => {
        const data = action.payload.doc.data() as ProductoInterface;
        data.id = action.payload.doc.id;
        return data;
      })
    }));
  }

  getOneProducto(idProducto: string){
    this.productoDoc = this.afs.doc<ProductoInterface>(`productos/${idProducto}`);
    return this.producto = this.productoDoc.snapshotChanges().pipe(map(action => {
      if(action.payload.exists === false){
        return null;
      }
      else{
        const data = action.payload.data() as ProductoInterface;
        data.id = action.payload.id;
        return data;
      }
    }));
  }

  addCarrito(producto: CarritoInterface){
    let listCarrito:CarritoInterface[] = this.getCarrito();
    let entProducto = listCarrito.filter((item, index) => {
      if(item.id == producto.id){
        item.cantidad += producto.cantidad;
        item.subtotal = item.precio * item.cantidad;
        return item;
      }
      else{
        return null;
      }
    });
    if(entProducto.length==0) listCarrito.push(producto);
    sessionStorage.setItem('carrito', JSON.stringify(listCarrito));
  }

  getCarrito(){
    if(sessionStorage.getItem('carrito')){
      return JSON.parse(sessionStorage.getItem('carrito'))
    }
    return [];
  }

  getTotalCarrito(){
    return this.getCarrito().length;
  }

  updateStock(idProducto: string, cantidad: number){
    var keepGoing = true;
    return this.getOneProducto(idProducto).forEach( producto => {
      if(keepGoing) {
          //if(producto.disponible > cantidad) return 0;
          producto.disponible -= cantidad;
          this.productoDoc = this.afs.doc<ProductoInterface>(`productos/${idProducto}`);
          this.productoDoc.update(producto);
          keepGoing = false;
          return 1;
      }
    });
  }

  payCarrito(){
    sessionStorage.removeItem('carrito');
    this.route.navigateByUrl('/main(principal:lista)');
  }
}
