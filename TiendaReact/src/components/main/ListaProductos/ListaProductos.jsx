import React, { Component } from 'react';
import firebase from 'firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt, faPlusCircle, faBoxes, faStoreAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Toast  from "react-bootstrap/Toast";
import './ListaProductos.css';

class ListaProductos extends Component{

    componentWillMount(){
        firebase.firestore().collection('productos').onSnapshot(snapshot => {
            const productosList = [];
            this.productos = snapshot.docs.map( doc => {
                    const data = doc.data()
                    data.id = doc.id;
                    productosList.push(data);
                }
            );
            this.setState({productos: productosList});
            this.productosfilter = productosList;
        })
    }
    constructor(){
        super();
        this.productosfilter = [];
        this.productos = [];
        this.state = {
            productos: [],
            cantidad: 1,
            blnMessage: false
        }
        this.filtro=this.filtro.bind(this);
    }

    filtro(events){
        this.productos = this.productosfilter;
        const filterValue = events.target.value.toLowerCase();
        let filtro = this.productos.filter(option => option.nombre.toLowerCase().indexOf(filterValue)!==-1);
        this.setState({productos: filtro});
    }

    getCarrito(){
        if(sessionStorage.getItem('carrito')){
          return JSON.parse(sessionStorage.getItem('carrito'))
        }
        return [];
      }

    addCarrito(producto, cantidad){
        producto.cantidad = parseInt(cantidad);
        producto.subtotal = parseInt(cantidad) * producto.precio;
        let listCarrito = this.getCarrito();
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
        this.setState({blnMessage: true});
        this.props.onChange();
    }

    actualizaCantidad(events){
        this.setState({cantidad: events.target.value});
    }

    getAllProductos(){
        return this.state.productos.map(item => {
            return (
                    <div key={item.id} className="col-4 mb-3">
                        <div className="card flex">
                            <img src={process.env.PUBLIC_URL + item.imagenUrl} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h4 className="card-title font-weight-bold text-uppercase">{item.nombre}</h4>
                                <p className="card-text"><strong>Precio:</strong> S/.{item.precio}</p>
                                <p className="card-text"><strong>Unidades disponibles:</strong> {item.disponible}</p>
                                <div className="row form-inline">
                                    <div className="col-6">
                                        <Link to={`/main/producto/${item.id}`} className="btn btn-danger text-white bg-principal border-0"><FontAwesomeIcon icon={faExternalLinkAlt}></FontAwesomeIcon>&nbsp;&nbsp;Ver Más</Link>
                                        {/* <a className="btn btn-danger text-white bg-principal border-0"><FontAwesomeIcon icon={faExternalLinkAlt}></FontAwesomeIcon>&nbsp;&nbsp;Ver Más</a> */}
                                    </div>
                                    <div className="col-6">
                                        {
                                            item.disponible > 0 ? (
                                                <div className="input-group">
                                                    <div className="input-group-prepend">
                                                        <button className="btn btn-success" type="button" id="button-addon1" onClick={this.addCarrito.bind(this,item,this.state.cantidad)}><FontAwesomeIcon icon={faPlusCircle}></FontAwesomeIcon> Añadir</button>
                                                    </div>
                                                    <input type="number" min="1" max={item.disponible} onChange={this.actualizaCantidad.bind(this)} defaultValue={this.state.cantidad} className="form-control" aria-describedby="button-addon1" />
                                                </div>
                                            ) : (
                                                <div className="text-center">SIN STOCK</div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            )
        })
    }

    render(){
        return(
            <div component-listaproductos="">
                <div className="container p-3">
                    <div className="header">
                        <div className="float-left">
                            <h2><FontAwesomeIcon icon={faBoxes}></FontAwesomeIcon>  Catálogo de productos</h2>
                        </div>
                        <div className="float-right w-25">
                            ¿Qué estás buscando?
                            <input type="text" name="" className="form-control" placeholder="Buscar producto" onKeyUpCapture={this.filtro} />
                        </div>
                    </div>
                    <hr />
                    {
                        this.state.productos.length === 0 ? (
                            <div className="p-2">
                                <h3 className="text-center">No se encontraron registros.</h3>
                            </div>
                        ) : (
                            <div className="row p-2">
                                {this.getAllProductos()}
                            </div>
                        )
                    }
                </div>
                <div aria-live="polite" aria-atomic="true" style={{ position: 'fixed', minHeight: '200px', top: '57px', right: '20px'}}>
                    <Toast onClose={() => this.setState({ blnMessage: false})} show={this.state.blnMessage} delay={5000} autohide style={{ position: 'absolute', top: '20px', right: '20px', minWidth: '250px' }}>
                        <Toast.Header>
                        <FontAwesomeIcon icon={faStoreAlt}></FontAwesomeIcon>
                        <i className="fas fa-store-alt mr-2"></i>
                        <strong className="mr-auto">Tienda Angular/Reat</strong>
                        </Toast.Header>
                        <Toast.Body className="toast-body text-danger font-weight-bold">Producto agregado al carrito correctamente.</Toast.Body>
                    </Toast>
                </div>
            </div>
        )
    }
}

export default ListaProductos;