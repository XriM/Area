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
      <Navbar.Brand href="/">AREA</Navbar.Brand>
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
        className=""
        onClick = { () => {navigate("/my-widgets")}}
        style={{ borderBlockColor: 'black', marginRight: 30 }}
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
        className=""
        onClick = { () => {navigate("/create")}}
        style={{ borderBlockColor: 'black', marginRight: 30 }}
      >
        Create
      </Button>
    </>
  );
}

function Profile() {
  let navigate = useNavigate();

  return (
    <Button variant="outline-dark" onClick={() => { navigate('/profile') }}><FontAwesomeIcon icon={faUser} style={{color: 'black'}}/></Button>
  );
}

export default NavbarLogged;
