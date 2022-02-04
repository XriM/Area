import "../../App.css";
import { Button, Card, Form, Image, Row, Col, ButtonGroup, ToggleButton, Modal, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { UserResponse, User } from "../../helper/types";
import { deleteArea, getArea, getAreas, NavbarLogged } from "..";

export default function CreateTrigger() {
  return (
    <>
    <div className="area" >
      <ul className="circles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <NavbarLogged />
      <Body />
    </div>
    </>
  );
}

function Body() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
    <Container>
      <br/>
      <Row className="create__action">
        <a style={{ marginTop: 10, fontWeight: 'bold', fontSize: '3rem' }} onClick={handleShow}>ACTION</a>
        <Button variant="" style={{ marginTop: 10, fontWeight: 'bold', fontSize: '3rem' }} onClick={handleShow}>+</Button>
      </Row>
      <br/>
      <Row style={{backgroundColor: '#f6f6f6', borderRadius: 20}}>
        <Col md={3}>
          <Image fluid={true} srcSet="https://www.designbust.com/download/1026/png/email_icon_transparent_background512.png"></Image>
        </Col>
        <Col md={3}>
          <Image fluid={true} srcSet="http://pngimg.com/uploads/bitcoin/bitcoin_PNG48.png"></Image>
        </Col> 
        <Col md={3}>
          <Image fluid={true} srcSet="https://www.pngitem.com/pimgs/m/108-1086701_steam-steam-white-logo-png-transparent-png.png"></Image>
        </Col>
        <Col md={3}>
          <Image fluid={true} srcSet="https://www.seekpng.com/png/detail/133-1330400_weather-icon-png-image-transparent-background-weather-icon.png"></Image>
        </Col>
      </Row>
    </Container>

    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
    </>
  );
}
