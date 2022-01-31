import React, { Component }  from 'react';
import "../App.css";
import {
  Container,
  Nav,
  Navbar,
  Button
} from "react-bootstrap";
import { useNavigate } from "react-router";

function NavbarLogged() {
  return (
    <>
    <Navbar bg="light" expand="lg">
      <Container>
      <Navbar.Brand href="/">AREA</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          </Nav>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  );
}

function MyWidgets() {
  const navigate = useNavigate();

  return (
    <>
      <Button
        variant="light"
        className="loginButton"
        onClick = { () => {navigate("/faq")}}
      >
        F.A.Q
      </Button>
    </>
  );
}

export default NavbarLogged;
