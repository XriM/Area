import { useState }  from 'react';
import "../../App.css";
import { Modal, Button, Form, FloatingLabel } from "react-bootstrap";

import { UserResponse } from "../../helper/types";
import { signup } from "..";

function ShowSignup() {
  const [show, setShow] = useState<boolean>(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [actualEmail, setEmail] = useState<string>("");
  const [actualPasswd, setPasswd] = useState<string>("");
  const [actualUsername, setUsername] = useState<string>("");
  const input_user: UserResponse = { id: "", email: "", password: "", username: "" };

  return (
    <>
      <Button variant="outline-light" className="secondary__btn__color" onClick={handleShow}>
        Signup
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Signup</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <FloatingLabel
                controlId="floatingInput"
                label="Email address"
                className="mb-3"
              >
              <Form.Control
                type="text"
                value={actualEmail}
                onChange={(e) => {
                  input_user.email = e.target.value;
                  setEmail(e.target.value);
                }}
              />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3">
              <FloatingLabel
                controlId="floatingInput"
                label="Username"
                className="mb-3"
              >
              <Form.Control
                type="text"
                value={actualUsername}
                onChange={(e) => {
                  input_user.username = e.target.value;
                  setUsername(e.target.value);
                }}
              />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3">
              <FloatingLabel
                controlId="floatingInput"
                label="Password"
                className="mb-3"
              >
              <Form.Control
                type="password"
                value={actualPasswd}
                onChange={(e) => {
                  input_user.password = e.target.value;
                  setPasswd(e.target.value);
                }}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a minimum 8 characters password.
              </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
            <Button
            variant="primary"
            className="principal__btn__color"
            onClick = {async () => {
              const result = await signup(actualEmail, actualPasswd, actualUsername);
              if (result === true) {
                handleClose();
                setEmail("");
                setPasswd("");
              }
            }}
            >
              Signup
            </Button>
            <Button
            variant="primary" style={{marginLeft: 5}} className="principal__cancel__color"
            onClick={handleClose}>
              Cancel
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <a style={{ opacity: 0.8 }}>Area Entreprise</a>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export { ShowSignup };
