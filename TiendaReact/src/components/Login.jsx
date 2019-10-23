import React, { Component } from 'react';
import firebase from 'firebase';
import Toast  from "react-bootstrap/Toast";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStoreAlt } from '@fortawesome/free-solid-svg-icons';
import { Redirect } from 'react-router-dom';

class Login extends Component{
    constructor(){
        super();
        this.state = {
            correo: '',
            contrasena: '',
            blnMessage: false,
            redirect: false
        }
        this.changeState = this.changeState.bind(this);
        this.onLogin = this.onLogin.bind(this);
    }

    changeState(event) {
        if(event.target.id === "correo"){
          this.setState({correo: event.target.value});
        }
        if(event.target.id === "contrasena"){
            this.setState({contrasena: event.target.value});
        }
    }

    onLogin(event){
        event.preventDefault();
        let correo = this.state.correo,
            contrasena = this.state.contrasena;
        firebase.auth().signInWithEmailAndPassword(correo, contrasena)
        .then( result => {
            sessionStorage.setItem('currentuser', JSON.stringify(result.user));
            this.setState({redirect: true});
            console.log(`${result.user.email} ha iniciado sesión`);
        })
        .catch(err => {
            console.log(`Error ${err.code}: ${err.message}`);
            this.setState({ blnMessage: true });
        });
    }

    render(){
        const { redirect } = this.state;
        if(redirect){
            return <Redirect to='/main'/>;
        }
        return (
            <div className="main-container">
                <div className="login-container">
                    <div className="col-10 col-sm-8 col-md-6 col-lg-4 col-xl-3 form-container">
                        <form onSubmit={this.onLogin}>
                            <h3 className="text-center font-weight-bold">Inicio de sesión</h3>
                            <div className="form-group">
                                <label htmlFor="correo">Correo electrónico</label>
                                <input value={this.state.correo} onChange={this.changeState} type="email" id="correo" className="form-control font-weight-bold" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="contrasena">Contraseña</label>
                                <input value={this.state.contrasena} onChange={this.changeState} type="password" id="contrasena" className="form-control font-weight-bold" required />
                            </div>
                            <button type="submit" className="btn btn-success w-100 mt-2">INGRESAR</button>
                        </form>
                    </div>
                </div>
                <div aria-live="polite" aria-atomic="true" style={{ position: 'relative', minHeight: '200px'}}>
                    <Toast onClose={() => this.setState({ blnMessage: false})} show={this.state.blnMessage} delay={5000} autohide style={{ position: 'absolute', top: '20px', right: '20px', minWidth: '250px' }}>
                        <Toast.Header>
                        <FontAwesomeIcon icon={faStoreAlt}></FontAwesomeIcon>
                        <i className="fas fa-store-alt mr-2"></i>
                        <strong className="mr-auto">Tienda Angular/Reat</strong>
                        </Toast.Header>
                        <Toast.Body className="toast-body text-danger font-weight-bold">Usuario y/o contraseña no válidos.</Toast.Body>
                    </Toast>
                </div>
            </div>
        )
    }
}

export default Login;