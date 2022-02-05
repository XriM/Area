import React, { Component }  from 'react';
import "../App.css";
import {
  Container,
  Nav,
  Navbar,
  Button
} from "react-bootstrap";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function NavbarLogged() {
  return (
    <>
    <Navbar bg="light" expand="lg">
      <Container>
      <Navbar.Brand href="/" className="principal__color" style={{fontWeight: "bold"}}>AREA</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          </Nav>
          <MyWidgets />
          <CreateTrigger />
          <Profile />
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
        className="secondary__btn__color"
        onClick = { () => {navigate("/triggers")}}
        style={{ marginRight: 30 }}
      >
        My triggers
      </Button>
    </>
  );
}

function CreateTrigger() {
  const navigate = useNavigate();

  return (
    <>
      <Button
        variant="light"
        className="secondary__btn__color"
        onClick = { () => {navigate("/create")}}
        style={{ marginRight: 30 }}
      >
        Create
      </Button>
    </>
  );
}

function Profile() {
  let navigate = useNavigate();

  return (
    <Button variant="dark" className="secondary__btn__color" onClick={() => { navigate('/profile') }}><FontAwesomeIcon icon={faUser} style={{color: 'white'}}/></Button>
  );
}

export default NavbarLogged;
