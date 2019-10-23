import React, { Component } from "react";
import { Navbar, Nav, Badge, NavItem } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStoreAlt, faBoxes, faShoppingCart, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './NavBar.css';
 
class NavBar extends Component{

    constructor(props){
        super(props);
        this.logout = this.logout.bind(this);
    }
    
    logout(){
        sessionStorage.removeItem("currentuser");
        this.props.onVerifySession();
    }

    render(){
        return(
            <div component-navbar="">
                <Navbar bg="light" expand="lg" fixed="top">
                    <Navbar.Brand href="#home"><FontAwesomeIcon icon={faStoreAlt}></FontAwesomeIcon> Tienda Angular/React</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <NavItem>
                                <Nav.Link href="/main"><FontAwesomeIcon icon={faBoxes}></FontAwesomeIcon> Principal</Nav.Link>
                            </NavItem>
                            <NavItem>
                                <Nav.Link href="/carrito"><FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon> Carrito <Badge variant="success">{this.props.totalCarrito}</Badge></Nav.Link>
                            </NavItem>
                            <NavItem>
                                <Nav.Link onClick={this.logout}><FontAwesomeIcon icon={faSignOutAlt}></FontAwesomeIcon> Salir</Nav.Link>
                            </NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

export default NavBar;