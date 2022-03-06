import "../../App.css";
import { useState } from "react";
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

import { logToService } from "../api";

var trelloKey = "7b6292b9c2d2d0d8cbe96937dee3765a";

export function TrelloSignin() {
  const [actualKey, setKey] = useState("");
  var input_key : string = "";

  const [show, setShow] = useState<boolean>(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
    <Button className="principal__btn__color"><FontAwesomeIcon icon={faLink} style={{color: 'white'}} onClick= { async () => {
      const apiToken = TrelloOauth();
      handleShow();
    }}/></Button>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Trello Signin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <FloatingLabel
                controlId="floatingInput"
                label="Enter the given Trello API key"
                className="mb-3"
              >
              <Form.Control
                required
                type="text"
                value={actualKey}
                onChange={(e) => {
                  input_key = e.target.value;
                  setKey(e.target.value);
                }}
              />
              </FloatingLabel>
            </Form.Group>

            <Button
              variant="primary"
              className="principal__btn__color"
              onClick={ async () => {
                const insert = await logToService(actualKey, '1');
                if (insert === "Service token successfully loaded") {
                  handleClose();
                  setKey("");
                }
              }}
            >
              Connect
            </Button>
            <Button
            variant="primary" style={{marginLeft: 5}} className="principal__cancel__color"
            onClick={ () => {
              handleClose();
              setKey("");
            }}>
              Cancel
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <a style={{ opacity: 0.8 }}>Area Enterprise</a>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function TrelloOauth() {
  window.open("https://trello.com/1/authorize?expiration=1day&name=MyPersonalToken&scope=read,write&response_type=token&key=" + trelloKey);
}
