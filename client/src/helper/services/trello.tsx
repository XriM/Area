import "../../App.css";
import { useState } from "react";
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

import { logToService } from "../api";

var trelloKey = "7b6292b9c2d2d0d8cbe96937dee3765a";
var token = "a60c5415cca82f9742c540076f00dd32bdc069dc4aece6cf6d8e4913df450000";

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
                GetBoards();
                const insert = await logToService(actualKey, '1');
                if (insert == true) {
                  token = actualKey;
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
  window.open("https://trello.com/1/authorize?expiration=1day&name=MyPersonalToken&scope=read&response_type=token&key=" + trelloKey);
}

async function GetBoards() {
  var axios = require('axios');

  var config = {
    method: 'get',
    url: 'https://api.trello.com/1/members/me/boards?key=' + trelloKey + '&token=' + token,
    headers: { 
      'Cookie': 'dsc=be5b554b6883d1fe7c9e4eda1adf22c1ba68ae250ed8ef69c32487b36fe27034; preAuthProps=s%3A615afb3ae9a4423f12410c59%3AisEnterpriseAdmin%3Dfalse.QQhiuUCEnuGPc6peXEJYWXVYXuFAcx0%2F0zpcQEKXjjc'
    }
  };

  axios(config)
  .then(function (response : any) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error : any) {
    console.log(error);
  });

  return;
}

function GetLists() {

}