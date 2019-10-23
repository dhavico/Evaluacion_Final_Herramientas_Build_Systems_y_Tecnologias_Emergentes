import React, { Component } from 'react';
import NavBar from '../NavBar';
import ListaProductos from './ListaProductos/ListaProductos';
import './Main.css';
import DetalleProducto from './DetalleProducto/DetalleProducto';
import Carrito from './Carrito/Carrito';

class Main extends Component{

    componentWillMount(){
        this.setState({ totalCarrito: this.getCarrito().length });
    }
    
    constructor(){
        super();
        this.verifySession();
        this.totalCarrito = 0;
        this.getTotalCarrito = this.getTotalCarrito.bind(this);
    }

    verifySession(){
        if(!sessionStorage.getItem('currentuser')){
            window.location.href = "/";
        }
    }

    getCarrito(){
        if(sessionStorage.getItem('carrito')){
          return JSON.parse(sessionStorage.getItem('carrito'))
        }
        return [];
    }

    getTotalCarrito(){
        this.setState({ totalCarrito: this.getCarrito().length });
    }

    render(){
        return(
            <div component-main="">
                <NavBar totalCarrito={this.state.totalCarrito} onVerifySession={this.verifySession}/>
                <div className="main-container">
                    Hola soy el main
                </div>
                {
                    this.props.location.pathname === '/main' ?
                    (
                        <ListaProductos onChange={this.getTotalCarrito}/>
                    ) : this.props.location.pathname === '/carrito' ? 
                        (
                            <Carrito/>
                        ) : (
                            <DetalleProducto id={this.props.match.params.id}/>
                        )
                }
            </div>
        )
    }
}

export default Main;