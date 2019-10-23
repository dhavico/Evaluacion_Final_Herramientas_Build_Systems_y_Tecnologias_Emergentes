import React from 'react';
import ReactDOM from 'react-dom';
import'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import firebase from 'firebase/app';
import * as serviceWorker from './serviceWorker';
import Login from './components/Login';
import Main from './components/main/Main';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Carrito from './components/main/Carrito/Carrito';

firebase.initializeApp({
    apiKey: "AIzaSyAWFtIhIWrRRD45jdR2Qor-6n9f_o5Dv4I",
    authDomain: "apptiendaangularreact.firebaseapp.com",
    databaseURL: "https://apptiendaangularreact.firebaseio.com",
    projectId: "apptiendaangularreact",
    storageBucket: "apptiendaangularreact.appspot.com",
    messagingSenderId: "893440221010",
    appId: "1:893440221010:web:efcc8a7e852525d3d6648b"
});

ReactDOM.render(
    <Router>
        <Route exact path='/' component={Login}></Route>
        <Route exact path='/main' component={Main}></Route>
        <Route exact path='/main/Producto/:id' component={Main}></Route>
        <Route exact path='/carrito' component={Main}></Route>
        {/* <Route path='/carrito' component={Carrito}></Route> */}
    </Router>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
