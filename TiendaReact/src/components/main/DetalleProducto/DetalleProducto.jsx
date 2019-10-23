import React, { Component } from 'react';
import './DetalleProducto.css';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPointLeft } from '@fortawesome/free-solid-svg-icons';

class DetalleProducto extends Component{
    constructor(props){
        super(props);
        this.producto = {};
        this.state = {
            producto: {}
        }
    }
    getOneProducto(){
        let idProducto = this.props.id;
        firebase.firestore().doc(`productos/${idProducto}`).onSnapshot(snapshot => {
            if(snapshot.exists === false){
                this.setState({producto: null});
            }
            else{
                const data = snapshot.data();
                data.id = snapshot.id;
                this.producto = data;
                this.setState({producto: this.producto});
            }
            
        })
        if(this.state.producto == null){
            window.location.href = '/main';
        }
        else{
        return (
            <div className="container p-3">
                <div className="header">
                    <h2 className="float-left text-uppercase">{this.state.producto.nombre}</h2>
                    <div className="float-right">
                        <Link to={'/main'} className="btn btn-light" id="button-addon1"><FontAwesomeIcon icon={faHandPointLeft}></FontAwesomeIcon>&nbsp;&nbsp;Atrás</Link>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-6">
                        <img src={this.state.producto.imagenUrl} className="w-100" alt="..." />
                    </div>
                    <div className="col-6 detalle">
                        <div>{this.state.producto.descripcion}</div>
                        <hr />
                        <div><strong>Precio:</strong> S/. {this.state.producto.precio}</div>
                        <div><strong>Unidades disponibles:</strong> {this.state.producto.disponible}</div>
                    </div>
                </div>
            </div>
        )
        }
    }
    render(){
        return(
            <div component-detalleproducto="">
                {
                    this.getOneProducto()
                }
            </div>
        )
    }
}

export default DetalleProducto;