import React, { Component } from 'react';
import firebase from 'firebase';
import './Carrito.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

class Carrito extends Component {

    componentWillMount(){
        this.getTotalPagarCarrito();
    }
    constructor(){
        super();
        this.state = {
            totalPagar: 0
        }
        this.producto = [];
        this.payCarrito = this.payCarrito.bind(this);
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

    getTotalPagarCarrito(){
        let totalPagar = 0;
        this.getCarrito().map(producto => {
            totalPagar += producto.subtotal;
            this.setState({ totalPagar: totalPagar });
        });
    }

    getProductosCarrito(){
         return this.getCarrito().map( producto => {
            
             return (
                <div key={producto.id}>
                    <div className="row item-producto">
                        <div className="col-3">
                            <img src={process.env.PUBLIC_URL + producto.imagenUrl} className="w-100" alt="..." />
                        </div>
                        <div className="col-6 detalle">
                            <h3 className="font-weight-bold text-uppercase">{producto.nombre}</h3>
                            <div><strong>Cantidad:</strong> {producto.cantidad}</div>
                            <div><strong>Precio unitario:</strong> {producto.precio}</div>
                            <div><strong>Subtotal:</strong> S/. {producto.subtotal}</div>
                        </div>
                    </div>
                    <hr />
                </div>
            )
         });
    }

    updateStock(producto){
        producto.disponible -= producto.cantidad;
        let productoDoc = firebase.firestore().doc(`productos/${producto.id}`);
        productoDoc.update(producto);
    }

    payCarrito(event){
        this.getCarrito().map( producto => {
            let idProducto = producto.id;
            this.updateStock(producto);
            console.log(producto);
        });
        setTimeout(function(){
            sessionStorage.removeItem('carrito');
            window.location.href = '/main';
        }, 500);
    }

    render(){
        return (
            <div component-carrito="">
                <div className="container p-3">
                    <div className="header">
                        <h2><FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon> Carrito de compras <span className="badge badge-success">{this.getTotalCarrito()}</span></h2>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-9">
                            {
                                this.getProductosCarrito()
                            }
                        </div>
                        <div className="col-3">
                            <div className="totalCarrito">
                                <div>Total a pagar</div>
                                <div className="totalPagar">S/. {this.state.totalPagar}</div>
                                <button type="button" className="btn btn-success w-100" onClick={this.payCarrito}><i className="fas fa-money-bill-wave"></i> PAGAR</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Carrito;